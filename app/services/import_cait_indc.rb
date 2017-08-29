require 'csv'

META_INDICATORS_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - indicators.csv'.freeze
META_LEGEND_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - legend.csv'.freeze
DATA_FILEPATH = 'cait_indc/Backend-CAIT INDC Map - data.csv'.freeze

class ImportCaitIndc
  def call
    cleanup

    @indicators = CSV.parse(read_from_s3(META_INDICATORS_FILEPATH), headers: true, header_converters: :symbol).
      map { |r| r.to_h }

    @legend = CSV.parse(read_from_s3(META_LEGEND_FILEPATH), headers: true, header_converters: :symbol).
      map { |r| r.to_h }

    @data = CSV.parse(read_from_s3(DATA_FILEPATH), headers: true, header_converters: :symbol).
      map { |r| r.to_h }

    import_categories
    import_indicator_types
    import_charts
    import_indicators
    import_indicator_values
  end

  private

  def read_from_s3(file_name)
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: file_name)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{file_name} not found in #{bucket_name}"
      return
    end
    file.body.read
  end

  def cleanup
    CaitIndc::LocationDatum.delete_all
    CaitIndc::LocationIndicatorValue.delete_all
    CaitIndc::IndicatorValue.delete_all
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
      summary_list: indicator[:summary_list] == 'Yes',
      on_map: indicator[:on_map] == 'Yes',
      omit_from_detailed_view: indicator[:omit_from_detailed_view] == 'x',
      show_in_dashboard: indicator[:show_in_dashboard] == 'x'
    }
  end

  def indicator_value_attributes(indicator_value)
    {
      indicator: CaitIndc::Indicator.
        find_by(name: indicator_value[:indicator_name]),
      name: indicator_value[:legend_item_name],
      color: indicator_value[:color]
    }
  end

  def import_categories
    @indicators.
      map { |r| r[:category] }.
      sort_by.
      uniq.
      select { |cat| cat }.
      each { |cat| CaitIndc::Category.create!(name: cat) }
  end

  def import_indicator_types
    @indicators.
      map { |r| r[:indicator_type] }.
      sort_by.
      uniq.
      select { |ind_t| ind_t }.
      each { |ind_t| CaitIndc::IndicatorType.create(name: ind_t) }
  end

  def import_charts
    @legend.
      map { |r| r[:chart_title] }.
      sort_by.
      uniq.
      select { |chart_t| chart_t }.
      each { |chart_t| CaitIndc::Chart.create(name: chart_t) }
  end

  def import_indicators
    @indicators
      .each { |ind| CaitIndc::Indicator.create!(indicator_attributes(ind)) }
  end

  def import_indicator_values
    @legend.
      map { |l| l.except(:chart_name) }.
      uniq.
      each { |ind_v|
        CaitIndc::IndicatorValue.create(indicator_value_attributes(ind_v))
      }
  end
end
