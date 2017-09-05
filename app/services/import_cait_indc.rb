META_INDICATORS_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - indicators.csv'.
  freeze
META_LEGEND_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - legend.csv'.
  freeze
DATA_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - data.csv'.
  freeze
DEFAULT_CATEGORY = 'General'.freeze

class ImportCaitIndc
  def call
    cleanup

    load_csvs

    import_categories
    import_indicator_types
    import_charts
    import_indicators

    load_indicator_keys

    import_labels
    import_location_data
    import_values
  end

  private

  def load_csvs
    @indicators = S3CSVReader.read(META_INDICATORS_FILEPATH).map(&:to_h)
    @legend = S3CSVReader.read(META_LEGEND_FILEPATH).map(&:to_h)
    @data = S3CSVReader.read(DATA_FILEPATH).map(&:to_h)
  end

  def load_indicator_keys
    @indicator_keys = CaitIndc::Indicator.all.map do |i|
      i.name.downcase.strip.tr(' ', '_').gsub(/\W/, '').to_sym
    end
  end

  def cleanup
    CaitIndc::LocationDatum.delete_all
    CaitIndc::Value.delete_all
    CaitIndc::Label.delete_all
    CaitIndc::Indicator.delete_all
    CaitIndc::Chart.delete_all
    CaitIndc::Category.delete_all
    CaitIndc::IndicatorType.delete_all
  end

  def chart(indicator)
    chart_name = @legend.
      detect { |l| l[:indicator_name] == indicator[:indicator] }&.
      fetch(:chart_title, nil)

    CaitIndc::Chart.find_by(name: chart_name) if chart_name
  end

  def indicator_attributes(indicator)
    {
      chart: chart(indicator),
      indicator_type: CaitIndc::IndicatorType.
        find_by(name: indicator[:indicator_type]),
      category: CaitIndc::Category.find_by(name: indicator[:category]),
      name: indicator[:indicator],
      slug: Slug.create(indicator[:indicator]),
      summary_list: indicator[:summary_list] == 'Yes',
      on_map: indicator[:on_map] == 'Yes',
      omit_from_detailed_view: indicator[:omit_from_detailed_view] == 'x',
      show_in_dashboard: indicator[:show_in_dashboard] == 'x'
    }
  end

  def label_attributes(label)
    {
      indicator: CaitIndc::Indicator.
        find_by(name: label[:indicator_name]),
      name: label[:legend_item_name],
      color: label[:color]
    }
  end

  def location_datum_attributes(datum)
    {
      location: Location.find_by(wri_standard_name: datum[:country]),
      highlight_outline: datum[:highlight_outline] == 'x',
      marker_lat:
        (datum[:marker_latlng].split(',')[0] if datum[:marker_latlng]),
      marker_lng:
        (datum[:marker_latlng].split(',')[1] if datum[:marker_latlng]),
      data: datum.except(*@indicator_keys)
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

  def category_attributes(category_name)
    {
      name: category_name,
      slug: Slug.create(category_name)
    }
  end

  def import_categories
    @indicators.
      map { |r| r[:category].blank? ? DEFAULT_CATEGORY : r[:category].strip }.
      uniq.
      select(&:itself).
      each { |cat| CaitIndc::Category.create!(category_attributes(cat)) }
  end

  def import_indicator_types
    @indicators.
      map { |r| r[:indicator_type].strip }.
      uniq.
      select(&:itself).
      each { |ind_t| CaitIndc::IndicatorType.create!(name: ind_t) }
  end

  def import_charts
    @legend.
      map { |r| r[:chart_title].strip }.
      uniq.
      select(&:itself).
      each { |chart_t| CaitIndc::Chart.create!(name: chart_t) }
  end

  def import_indicators
    @indicators.each do |ind|
      CaitIndc::Indicator.create!(indicator_attributes(ind))
    end
  end

  def import_labels
    @legend.
      map { |l| l.except(:chart_name) }.
      uniq.
      each do |ind_v|
        CaitIndc::Label.create!(label_attributes(ind_v))
      end
  end

  def import_location_data
    @data.
      each do |d|
        a = location_datum_attributes(d)
        if a[:location]
          CaitIndc::LocationDatum.create!(a)
        else
          Rails.logger.error "location #{d[:country]} not found. Skipping."
        end
      end
  end

  def import_values
    @data.each do |d|
      location = Location.find_by(wri_standard_name: d[:country])
      unless location
        Rails.logger.error "location #{d[:country]} not found. Skipping."
        next
      end

      @indicator_keys.select { |ind_k| d[ind_k] }.each do |ind_k|
        CaitIndc::Value.create!(value_attributes(d, location, ind_k))
      end
    end
  end
end
