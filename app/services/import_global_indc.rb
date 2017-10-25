class ImportWbIndc

  GLOBAL_METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}global_indc/".freeze

  def call
    cleanup

    load_csvs
  end

  private

  def load_csvs
    @indicators = S3CSVReader.read(META_INDICATORS_FILEPATH).map(&:to_h)
    @data_sectorial = S3CSVReader.read(DATA_SECTORIAL_FILEPATH).map(&:to_h)
    @data_economy_wide = S3CSVReader.read(DATA_ECONOMY_WIDE_FILEPATH).
      map(&:to_h)
    @location_index = {}
    @indicator_index = {}
    @sector_index = {}
    @ignored_indicators = []
  end

  def cleanup
    WbIndc::Value.delete_all
    WbIndc::Sector.delete_all
    WbIndc::Category.delete_all
    WbIndc::Indicator.delete_all
    WbIndc::IndicatorType.delete_all
  end

end
