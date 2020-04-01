# rubocop:disable ClassLength
class ImportIndc
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_data.csv".freeze
  SINGLE_VERSION_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_single_version.csv".freeze
  LEGEND_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_legend.csv".freeze
  DATA_LTS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_LTS_data.csv".freeze
  DATA_LTS_SECTORAL_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_LTS_data_sectoral.csv".freeze
  DATA_WB_SECTORAL_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_WB_data_sectoral_all.csv".freeze
  SUBMISSIONS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_submission.csv".freeze
  METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_metadata.csv".freeze
  DOCUMENTS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_documents.csv".freeze

  def call
    ActiveRecord::Base.transaction do
      cleanup

      load_csvs
      load_locations

      import_documents
      import_sources
      import_category_types
      import_categories
      import_category_relations
      import_indicators
      import_indicators_categories
      import_labels
      import_values_ndc

      import_sectors_lts
      import_values_lts
      import_sector_values_lts

      import_sectors_wb
      import_values_wb

      reject_map_indicators_without_values_or_labels
      import_submissions
      Indc::SearchableValue.refresh
    end
  end

  private

  def cleanup
    Indc::Value.delete_all
    Indc::Category.delete_all
    Indc::CategoryType.delete_all
    Indc::Sector.delete_all
    Indc::Label.delete_all
    Indc::Indicator.delete_all
    Indc::Source.delete_all
    Indc::Submission.delete_all
    Indc::Document.delete_all
  end

  def load_csvs
    # relaxed symbol converter that lets through '-'
    symbol_converter = lambda { |h|
      h.downcase.gsub(/[^\s\w-]+/, '').strip.gsub(/\s+/, '_').to_sym
    }
    @documents = S3CSVReader.read(DOCUMENTS_FILEPATH, [symbol_converter]).map(&:to_h)
    @ndc_data = S3CSVReader.read(DATA_FILEPATH, [symbol_converter]).map(&:to_h)
    @single_version_data = S3CSVReader.read(SINGLE_VERSION_FILEPATH, [symbol_converter]).map(&:to_h)
    @labels = S3CSVReader.read(LEGEND_FILEPATH).map(&:to_h)
    @lts_data = S3CSVReader.read(
      DATA_LTS_FILEPATH, [symbol_converter]
    ).map(&:to_h)
    @lts_sectoral_data = S3CSVReader.read(DATA_LTS_SECTORAL_FILEPATH).map(&:to_h)
    @wb_sectoral_data = S3CSVReader.read(DATA_WB_SECTORAL_FILEPATH).map(&:to_h)
    @metadata = S3CSVReader.read(METADATA_FILEPATH).map(&:to_h)
    @submissions = S3CSVReader.read(SUBMISSIONS_FILEPATH).map(&:to_h)
  end

  def load_locations
    @locations_by_iso3 = Location.all.
      group_by(&:iso_code3).
      map { |key, value| [key, value.first] }.
      to_h

    @locations_by_iso2 = Location.all.
      group_by(&:iso_code2).
      map { |key, value| [key, value.first] }.
      to_h
  end

  def category_attributes(name, category_type, index)
    {
      name: name,
      slug: Slug.create(name),
      category_type: category_type,
      order: index * 10
    }
  end

  def indicator_attributes(indicator, index)
    {
      name: indicator[:long_name],
      slug: indicator[:column_name],
      description: indicator[:definition],
      source: @sources_index[indicator[:source]],
      order: index * 10,
      multiple_versions: indicator[:multiple_version]
    }
  end

  def value_ndc_attributes(row, location, indicator)
    doc_slug = row[:document]&.parameterize&.gsub('-', '_')
    {
      location: location,
      indicator: indicator,
      label: Indc::Label.find_by(
        value: row[:"#{indicator.slug}_label"],
        indicator: indicator
      ),
      value: row[:"#{indicator.slug}"],
      document: Indc::Document.find_by(slug: doc_slug)
    }
  end

  def value_wb_attributes(row, location, indicator)
    doc_slug = row[:document]&.parameterize&.gsub('-', '_')
    {
      location: location,
      indicator: indicator,
      sector: @sectors_index[row[:subsector]],
      value: row[:responsetext],
      document: Indc::Document.find_by(slug: doc_slug)
    }
  end

  def document_attributes(doc)
    doc_slug = doc[:slug]&.parameterize&.gsub('-', '_')
    {
      ordering: doc[:order_number],
      slug: doc_slug,
      long_name: doc[:long_name],
      description: doc[:description]
    }
  end

  def submission_attributes(location, submission)
    {
      location: location,
      submission_type: submission[:type],
      language: submission[:language],
      submission_date: submission[:date_of_submission],
      url: submission[:url]
    }
  end

  def import_categories_of(category_type)
    @metadata.
      map { |m| m[:"#{category_type.name}_category"] }.
      select(&:itself).
      uniq.
      each_with_index do |name, index|
        Indc::Category.create!(category_attributes(name, category_type, index))
      end
  end

  def import_sources
    @sources_index = @metadata.
      map { |r| r[:source] }.
      uniq.
      each_with_object({}) do |source, memo|
        memo[source] = Indc::Source.create!(name: source)
      end
  end

  def import_category_types
    @category_types_index = @metadata.first.keys.
      select { |key| key.match(/_category$/) }.
      map { |c| c.to_s.gsub(/_category$/, '') }.
      each_with_object({}) do |category_type, memo|
        memo[category_type] = Indc::CategoryType.create!(name: category_type)
      end
  end

  def import_categories
    Indc::CategoryType.all.
      each do |category_type|
        import_categories_of(category_type)
      end
  end

  # rubocop:disable MethodLength
  def import_category_relations
    @metadata.each do |r|
      global_category = Indc::Category.
        includes(:category_type).
        find_by(
          slug: Slug.create(r[:global_category]),
          indc_category_types: {name: 'global'}
        ) or next

      if r[:overview_category]
        overview_category = Indc::Category.
          includes(:category_type).
          find_by(
            slug: Slug.create(r[:overview_category]),
            indc_category_types: {name: 'overview'}
          )
      end

      if r[:map_category]
        map_category = Indc::Category.
          includes(:category_type).
          find_by(
            slug: Slug.create(r[:map_category]),
            indc_category_types: {name: 'map'}
          )
      end

      global_category.children << [
        overview_category, map_category
      ].select(&:itself)
    end
  end
  # rubocop:enable MethodLength

  def import_indicators
    @metadata.
      map { |r| [[r[:column_name], r[:source]], r] }.
      uniq(&:first).
      map(&:second).
      each_with_index do |indicator, index|
        Indc::Indicator.create!(indicator_attributes(indicator, index))
      end
  end

  def import_indicators_categories
    @metadata.each do |r|
      indicator = Indc::Indicator.
        includes(:categories).
        find_by!(
          slug: r[:column_name],
          source: @sources_index[r[:source]]
        )

      categories = r.keys.
        select { |key| key.match(/_category$/) }.
        map { |c| c.to_s.gsub(/_category$/, '') }.
        map do |category_type|
          next if r[:"#{category_type}_category"].nil?

          Indc::Category.find_by!(
            name: r[:"#{category_type}_category"],
            category_type: @category_types_index[category_type]
          )
        end

      categories = categories.
        select(&:itself).
        reject do |category|
          indicator.categories.include?(category)
        end

      indicator.categories << categories
    end
  end

  def import_labels
    indicators = @labels.group_by { |l| l[:indicator_name] }.
      map { |k, v| [k, v.map { |i| {label: i[:legend_item], slug: i[:slug]} }] }.
      to_h

    indicators.each do |indicator_name, labels|
      indicator = Indc::Indicator.find_by(slug: indicator_name)
      next unless indicator

      no_document_submitted = 'No Document Submitted'
      nds_label_obj = labels.detect { |obj| obj[:label] == no_document_submitted }
      labels.reject! { |obj| obj[:label] == no_document_submitted }
      labels.each_with_index do |label_obj, index|
        Indc::Label.create!(
          indicator: indicator,
          value: label_obj[:label],
          slug: label_obj[:slug],
          index: index + 1
        )
      end
      next unless nds_label_obj.present?

      # fixed index for the No Document Submitted label
      Indc::Label.create!(
        indicator: indicator,
        value: nds_label_obj[:label],
        slug: nds_label_obj[:slug],
        index: -2
      )
    end
  end

  def import_values_ndc
    Indc::Indicator.
      where(source: [@sources_index['CAIT'], @sources_index['NDC Explorer'], @sources_index['WB']]).
      each do |indicator|
      (@single_version_data + @ndc_data).each do |r|
        location = @locations_by_iso3[r[:iso]]
        unless location
          Rails.logger.error "location #{r[:country]} not found. Skipping."
          next
        end

        next unless r[:"#{indicator.slug}"].present?

        Indc::Value.create!(
          value_ndc_attributes(r, location, indicator)
        )
      end
    end
  end

  def import_values_lts
    Indc::Indicator.
      where(source: @sources_index['LTS']).each do |indicator|
      @lts_data.each do |r|
        location = @locations_by_iso3[r[:iso]]
        unless location
          Rails.logger.error "location #{r[:country]} not found. Skipping."
          next
        end

        next unless r[:"#{indicator.slug}"].present?

        Indc::Value.create!(
          value_ndc_attributes(r, location, indicator)
        )
      end
    end
  end

  def import_sectors_lts
    sectors = @lts_sectoral_data.map do |d|
      d.slice(:sector, :subsector)
    end

    @sectors_index = {}
    sectors.uniq.each do |d|
      parent = Indc::Sector.find_or_create_by(
        name: d[:sector]
      )
      sector = Indc::Sector.create!(
        name: d[:subsector],
        parent: parent
      )

      @sectors_index[d[:subsector]] = sector
    end
  end

  def import_sector_values_lts
    indicator_index = Indc::Indicator.
      where(source: @sources_index['LTS']).
      group_by(&:slug).
      map { |k, v| [k, v.first] }.
      to_h

    @lts_sectoral_data.each do |r|
      location = @locations_by_iso3[r[:countrycode]]
      unless location
        Rails.logger.error "location #{r[:countrycode]} not found. Skipping."
        next
      end

      indicator = indicator_index[r[:questioncode]]
      unless indicator
        Rails.logger.error "indicator #{r[:questioncode]} not found. Skipping."
        next
      end

      next unless r[:responsetext]

      Indc::Value.create!(
        value_wb_attributes(r, location, indicator)
      )
    end
  end

  def import_sectors_wb
    sectors = @wb_sectoral_data.map do |d|
      d.slice(:sector, :subsector)
    end

    @sectors_index = {}
    sectors.uniq.each do |d|
      parent = Indc::Sector.find_or_create_by(
        name: d[:sector]
      )
      sector = Indc::Sector.create!(
        name: d[:subsector],
        parent: parent
      )

      @sectors_index[d[:subsector]] = sector
    end
  end

  def import_values_wb
    indicator_index = Indc::Indicator.
      where(source: @sources_index['WB']).
      group_by(&:slug).
      map { |k, v| [k, v.first] }.
      to_h

    @wb_sectoral_data.each do |r|
      location = @locations_by_iso2[r[:countrycode]]
      unless location
        Rails.logger.error "location #{r[:countrycode]} not found. Skipping."
        next
      end

      indicator = indicator_index[r[:questioncode]]
      unless indicator
        Rails.logger.error "indicator #{r[:questioncode]} not found. Skipping."
        next
      end

      next unless r[:responsetext]

      Indc::Value.create!(
        value_wb_attributes(r, location, indicator)
      )
    end
  end

  def import_documents
    @documents.each do |doc|
      Indc::Document.create!(document_attributes(doc))
    end
  end

  def import_submissions
    @submissions.each do |sub|
      location = Location.find_by(iso_code3: sub[:iso])
      next unless location
      begin
        Indc::Submission.create!(submission_attributes(location, sub))
      rescue
      end
    end
  end

  def reject_map_indicators_without_values_or_labels
    map_indicators = Indc::Category.
      joins(:category_type).
      where('indc_category_types.name' => 'map').
      includes(:indicators).map(&:indicators).flatten
    map_indicators.each do |indicator|
      if indicator.values.empty?
        Rails.logger.debug "Rejecting indicator without values: #{indicator.slug}"
        indicator.destroy
        next
      end
      if indicator.labels.empty?
        Rails.logger.debug "Rejecting indicator without labels: #{indicator.slug}"
        indicator.destroy
      end
    end
  end
end
# rubocop:enable ClassLength
