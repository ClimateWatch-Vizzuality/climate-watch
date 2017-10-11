class ImportWbIndc
  META_INDICATORS_FILEPATH = 'wb_indc/CW_NDC_WB_metadata_w_definitions.csv'
    .freeze
  DATA_SECTORIAL_FILEPATH = 'wb_indc/CW_NDC_WB_sectoral.csv'.freeze
  DATA_ECONOMY_WIDE_FILEPATH = 'wb_indc/CW_NDC_WB_economy_wide.csv'.freeze

  def call
    cleanup

    load_csvs

    import_indicator_types
    import_categories
    import_indicators
    import_sectors
    import_values

    refresh_matviews
  end

  private

  def load_csvs
    @indicators = S3CSVReader.read(META_INDICATORS_FILEPATH).map(&:to_h)
    @data_sectorial = S3CSVReader.read(DATA_SECTORIAL_FILEPATH).map(&:to_h)
    @data_economy_wide = S3CSVReader.read(DATA_ECONOMY_WIDE_FILEPATH)
      .map(&:to_h)
  end

  def cleanup
    WbIndc::Value.delete_all
    WbIndc::Sector.delete_all
    WbIndc::Category.delete_all
    WbIndc::Indicator.delete_all
    WbIndc::IndicatorType.delete_all
  end

  def import_indicator_types
    @indicators.map { |i| i[:questiontype] }.uniq.each do |t|
      WbIndc::IndicatorType.create(name: t)
    end
  end

  def import_categories
    @indicators.map do |i|
      [i[:category],i[:category_2]]
    end.flatten.uniq.reject do |c|
      c === 'NULL'
    end.each do |c|
      WbIndc::Category.create(
        name: c,
        slug: Slug.create(c)
      )
    end
  end

  def import_indicators
    @indicator_index = {}
    @ignored_indicators = []

    @indicators.each do |i|
      if i[:category_2] == 'NULL'
        @ignored_indicators << i[:questioncode]
        next
      end

      indicator = WbIndc::Indicator.create(
        indicator_type: WbIndc::IndicatorType.find_by(name: i[:questiontype]),
        code: i[:questioncode],
        name: i[:questiontext],
        description: i[:definition]
      )

      indicator.categories = WbIndc::Category.where(
        name: [i[:category], i[:category_2]]
      )

      @indicator_index[i[:questioncode]] = indicator
    end
  end

  def import_sectors
    @sector_index = {}

    @data_sectorial.map do |d|
      d.slice(:sector, :subsector)
    end.uniq.each do |d|
      parent = WbIndc::Sector.find_or_create_by(name: d[:sector])
      sector = WbIndc::Sector.create(
        name: d[:subsector],
        parent: parent
      )

      @sector_index[d[:subsector]] = sector
    end
  end

  def import_values
    @location_index = {}
    (@data_sectorial + @data_economy_wide).each do |d|
      location =
        if @location_index[d[:countrycode]]
          @location_index[d[:countrycode]]
        else
          location = Location.where(iso_code2: d[:countrycode]).first
          @location_index[d[:countrycode]] = location
          location
        end
      indicator = @indicator_index[d[:questioncode]]

      unless location
        Rails.logger.error "Location not found: #{d[:countrycode]}"
        next
      end

      unless indicator
        unless @ignored_indicators.include?(d[:questioncode])
          Rails.logger.error "Indicator not found: #{d[:questioncode]}"
        end
        next
      end

      WbIndc::Value.create(
        indicator: indicator,
        location: location,
        sector: @sector_index[d[:subsector]],
        value: d[:responsetext]
      )
    end
  end

  def refresh_matviews
    [
     'indc_categories',
     'indc_indicators',
     'indc_indicators_categories',
     'indc_sectors',
     'indc_values'
    ].each do |v|
      ActiveRecord::Base.connection.execute(
        "REFRESH MATERIALIZED VIEW #{v}"
      )
    end
  end
end
