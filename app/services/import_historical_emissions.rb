class ImportHistoricalEmissions
  # rubocop:disable LineLength
  META_SOURCES_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_metadata_sources.csv".freeze
  META_SECTORS_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_metadata_sectors_NEW.csv".freeze
  DATA_CAIT_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_CAIT.csv".freeze
  DATA_PIK_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_PIK.csv".freeze
  DATA_UNFCCC_FILEPATH = "#{CW_FILES_PREFIX}historical_emissions/CW_HistoricalEmissions_UNFCCC_NEW.csv".freeze
  # rubocop:enable LineLength
  #
  def call
    cleanup
    import_sources(S3CSVReader.read(META_SOURCES_FILEPATH))
    import_sectors(S3CSVReader.read(META_SECTORS_FILEPATH))
    import_records(S3CSVReader.read(DATA_CAIT_FILEPATH))
    import_records(S3CSVReader.read(DATA_PIK_FILEPATH))
    import_records(S3CSVReader.read(DATA_UNFCCC_FILEPATH))
    HistoricalEmissions::NormalisedRecord.refresh
    HistoricalEmissions::SearchableRecord.refresh
  end

  private

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
    content.each do |row|
      next if HistoricalEmissions::DataSource.find_by(
        name: row[:name]
      )

      source = source_attributes(row)
      HistoricalEmissions::DataSource.create!(source)
    end
  end

  def sector_attributes(row)
    {
      name: row[:sector],
      data_source: HistoricalEmissions::DataSource.find_or_create_by(
        name: row[:source]
      ),
      annex_type: row[:annex_type],
      parent: row[:subsectorof] &&
        HistoricalEmissions::Sector.find_or_create_by(name: row[:subsectorof])
    }
  end

  def import_sectors(content)
    content.each do |row|
      next if HistoricalEmissions::Sector.
        joins(:data_source).
        find_by(
          name: row[:sector],
          'historical_emissions_data_sources.name' => row[:source]
        )

      sector = sector_attributes(row)
      HistoricalEmissions::Sector.create!(sector)
    end
  end

  def emissions(row)
    row.headers.grep(/\d{4}/).map do |year|
      {year: year.to_s.to_i, value: row[year]&.to_f}
    end
  end

  def record_attributes(row)
    {
      location: Location.find_by(iso_code3: row[:country]),
      data_source: HistoricalEmissions::DataSource.find_by(name: row[:source]),
      sector: HistoricalEmissions::Sector.joins(:data_source).
        find_by(
          name: row[:sector],
          'historical_emissions_data_sources.name' => row[:source]
        ),
      gas: HistoricalEmissions::Gas.find_or_create_by(name: row[:gas]),
      gwp: HistoricalEmissions::Gwp.find_or_create_by(name: row[:gwp]),
      emissions: emissions(row)
    }
  end

  def import_records(content)
    content.each do |row|
      begin
        HistoricalEmissions::Record.create!(record_attributes(row))
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
