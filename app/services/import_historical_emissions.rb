class ImportHistoricalEmissions
  include ClimateWatchEngine::CSVImporter

  # rubocop:disable LineLength
  META_SOURCES_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_metadata_sources.csv".freeze
  META_SECTORS_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_metadata_sectors.csv".freeze
  DATA_CAIT_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_CAIT.csv".freeze
  DATA_PIK_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_PIK.csv".freeze
  DATA_UNFCCC_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_UNFCCC.csv".freeze
  # rubocop:enable LineLength
  #
  def call
    setup_cache

    ActiveRecord::Base.transaction do
      cleanup
      import_sources(S3CSVReader.read(META_SOURCES_FILEPATH))
      import_sectors(S3CSVReader.read(META_SECTORS_FILEPATH))
      import_records(S3CSVReader.read(DATA_CAIT_FILEPATH), DATA_CAIT_FILEPATH)
      import_records(S3CSVReader.read(DATA_PIK_FILEPATH), DATA_PIK_FILEPATH)
      import_records(S3CSVReader.read(DATA_UNFCCC_FILEPATH), DATA_UNFCCC_FILEPATH)

      Rails.logger.info 'Refreshing materialized views'
      HistoricalEmissions::NormalisedRecord.refresh
      HistoricalEmissions::SearchableRecord.refresh
    end
  end

  private

  def setup_cache
    @sources_cache = {}
    @sectors_cache = {}
    @gases_cache = {}
    @gwps_cache = {}
    @locations_cache = Location.all.each_with_object({}) do |location, cache|
      cache[location.iso_code3] = location
    end
  end

  def cleanup
    HistoricalEmissions::DataSource.delete_all
    HistoricalEmissions::Sector.delete_all
    HistoricalEmissions::Gas.delete_all
    HistoricalEmissions::Record.delete_all
    HistoricalEmissions::Record.delete_all
  end

  def source_attributes(row)
    {
      name: row[:name],
      display_name: row[:display_name],
      metadata_dataset: row[:metadata_dataset]
    }
  end

  def import_sources(content)
    import_each_with_logging(content, META_SOURCES_FILEPATH) do |row|
      name = row[:name]

      next if @sources_cache[name].present?

      source = HistoricalEmissions::DataSource.create!(source_attributes(row))
      @sources_cache[name] = source
    end
  end

  def sector_key(source, name)
    "#{source}_#{name}"
  end

  def sector_attributes(row)
    {
      name: row[:sector],
      data_source: @sources_cache[row[:source]],
      annex_type: row[:annex_type],
      parent: row[:subsectorof] &&
        @sectors_cache[sector_key(row[:source], row[:subsectorof])]
    }
  end

  def parse_aggregated_by(row)
    return [] if row[:aggregatedby].blank?

    row[:aggregatedby].split(';').
      map(&:strip).
      map { |name| @sectors_cache[sector_key(row[:source], name)] }
  end

  def import_sectors(content)
    import_each_with_logging(content, META_SECTORS_FILEPATH) do |row|
      key = sector_key(row[:source], row[:sector])
      next if @sectors_cache[key].present?

      sector = HistoricalEmissions::Sector.create!(sector_attributes(row))
      @sectors_cache[key] = sector

      parse_aggregated_by(row).each do |agg_by_sector|
        sector.aggregated_by << agg_by_sector
      end
    end
  end

  def emissions(row)
    row.headers.grep(/\d{4}/).map do |year|
      {year: year.to_s.to_i, value: row[year]&.to_f}
    end
  end

  def find_or_create_gas(name)
    @gases_cache[name] ||
      @gases_cache[name] = HistoricalEmissions::Gas.find_or_create_by(name: name)
  end

  def find_or_create_gwp(name)
    @gwps_cache[name] ||
      @gwps_cache[name] = HistoricalEmissions::Gwp.find_or_create_by(name: name)
  end

  def record_attributes(row)
    {
      location: @locations_cache[row[:country]],
      data_source: @sources_cache[row[:source]],
      sector: @sectors_cache["#{row[:source]}_#{row[:sector]}"],
      gas: find_or_create_gas(row[:gas]),
      gwp: find_or_create_gwp(row[:gwp]),
      emissions: emissions(row)
    }
  end

  def import_records(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      HistoricalEmissions::Record.create!(record_attributes(row))
    end
  end
end
