class ImportCaitIndc
  META_INDICATORS_FILEPATH = 'cait_indc_2/CW_NDC_CAIT_metadata.csv'.freeze
  META_LEGEND_FILEPATH = 'cait_indc_2/CW_NDC_CAIT_legend.csv'.freeze
  META_MAP_FILEPATH = 'cait_indc_2/CW_NDC_map.csv'.freeze
  DATA_FILEPATH = 'cait_indc_2/CW_NDC_CAIT_data.csv'.freeze
  SUBMISSIONS_FILEPATH = 'cait_indc_2/CW_NDC_Submission_URL.csv'.freeze

  def call
    cleanup

    load_csvs

    import_categories(@indicators, 'overview')
    import_categories(@map, 'map')
    import_charts
    import_indicators
    import_association_indicators_categories

    load_indicator_keys
    import_labels
    update_label_indexes
    import_values
    import_submissions

    refresh_materialized_views
  end

  private

  def load_csvs
    @indicators = S3CSVReader.read(META_INDICATORS_FILEPATH).map(&:to_h)
    @legend = S3CSVReader.read(META_LEGEND_FILEPATH).map(&:to_h)
    @data = S3CSVReader.read(DATA_FILEPATH).map(&:to_h)
    @map = S3CSVReader.read(META_MAP_FILEPATH).map(&:to_h)
    @submissions = S3CSVReader.read(SUBMISSIONS_FILEPATH).map(&:to_h)
  end

  def load_indicator_keys
    @indicator_keys = CaitIndc::Indicator.all.map do |i|
      i.slug.to_sym
    end
  end

  def cleanup
    CaitIndc::Value.delete_all
    CaitIndc::Label.delete_all
    CaitIndc::Indicator.delete_all
    CaitIndc::Chart.delete_all
    CaitIndc::Category.delete_all
    CaitIndc::Submission.delete_all
  end

  def chart(indicator)
    chart_name = @legend.
      detect { |l| l[:indicator_name] == indicator[:column_name] }&.
      fetch(:chart_title, nil)

    CaitIndc::Chart.find_by(name: chart_name) if chart_name
  end

  def indicator_attributes(indicator)
    {
      chart: chart(indicator),
      name: indicator[:long_name],
      slug: indicator[:column_name],
    }
  end

  def label_attributes(label)
    {
      indicator: CaitIndc::Indicator.
        find_by!(slug: label[:indicator_name]),
      name: label[:legend_item_name]
    }
  end

  def value_attributes(datum, location, indicator_key)
    indicator = CaitIndc::Indicator.find_by(slug: indicator_key)

    {
      location: location,
      indicator: indicator,
      label: CaitIndc::Label.find_by(
        name: datum[:"#{indicator_key}_label"],
        indicator: indicator
      ),
      value: datum[indicator_key]
    }
  end

  def category_attributes(category_name, category_type)
    {
      name: category_name,
      slug: Slug.create(category_name),
      category_type: category_type
    }
  end

  def submission_attributes(submission)
    {
      location: Location.find_by(iso_code3: submission[:iso]),
      submission_type: submission[:type],
      language: submission[:language],
      submission_date: submission[:date_of_submission],
      url: submission[:url]
    }
  end

  def select_categories(dataset, indicator_key, indicator, category_type)
    dataset.select { |r| r[indicator_key] == indicator.slug }.
      map do |r|
        CaitIndc::Category.where(
          name: r[:category],
          category_type: category_type
        ).first
      end.uniq
  end

  def import_categories(dataset, category_type)
    dataset.
      map { |r| r[:category].strip }.
      uniq.
      select(&:itself).
      each do |cat|
        CaitIndc::Category.create!(category_attributes(cat, category_type))
      end
  end

  def import_charts
    @legend.
      map { |r| r[:chart_title].strip }.
      uniq.
      select(&:itself).
      each { |chart_t| CaitIndc::Chart.create!(name: chart_t) }
  end

  def import_indicators
    @indicators.
      reject { |ind| ind[:column_name].match(/_label$/) }.
      each do |ind|
      CaitIndc::Indicator.create!(indicator_attributes(ind))
    end
  end

  def import_association_indicators_categories
    CaitIndc::Indicator.all.each do |indicator|
      overview_categories = select_categories(
        @indicators, :column_name, indicator, 'overview'
      )

      map_categories = select_categories(
        @map, :indicator, indicator, 'map'
      )

      indicator.categories = overview_categories + map_categories
    end
  end

  def import_labels
    label_fields = @data.first.keys.grep(/_label$/).
      map { |l| l.to_s.gsub(/_label$/, '') }

    label_accumulator = []
    label_fields.each do |lf|
      @data.each do |d|
        next if d[:"#{lf}_label"].nil?

        label_accumulator << {
          indicator_name: lf.to_s,
          legend_item_name: d[:"#{lf}_label"]
        }
      end
    end

    label_accumulator.uniq.each do |l|
      CaitIndc::Label.create!(label_attributes(l))
    end
  end

  def import_values
    ind_keys_no_label = @indicator_keys - @indicator_keys.grep(/_label$/)
    @data.each do |d|
      location = Location.find_by(iso_code3: d[:iso])
      unless location
        Rails.logger.error "location #{d[:country]} not found. Skipping."
        next
      end

      ind_keys_no_label.select { |ind_k| d[ind_k] }.each do |ind_k|
        CaitIndc::Value.create!(value_attributes(d, location, ind_k))
      end
    end
  end

  def import_submissions
    @submissions.each do |sub|
      CaitIndc::Submission.create!(submission_attributes(sub))
    end
  end

  def update_label_indexes
    sql = <<~END
      WITH indexes AS (
        SELECT l.id, l.indicator_id,
          ROW_NUMBER() OVER (
            PARTITION BY l.indicator_id
            ORDER BY l.id asc
          ) AS index
        FROM cait_indc_labels l
      )
      UPDATE cait_indc_labels l
      SET index = indexes.index
      FROM indexes
      WHERE indexes.id = l.id
    END

    ActiveRecord::Base.connection.execute(sql)
  end

  def refresh_materialized_views
    MaterializedView.refresh(
     'indc_categories',
     'indc_indicators',
     'indc_indicators_categories',
     'indc_labels',
     'indc_values'
    )
  end
end
