class ImportSocioeconomics
  GDP_FILEPATH =
    "#{CW_FILES_PREFIX}socioeconomics/indicators_gdp.csv".freeze
  GDP_PER_CAPITA_FILEPATH =
    "#{CW_FILES_PREFIX}socioeconomics/indicators_gdp_per_capita.csv".freeze
  POPULATION_FILEPATH =
    "#{CW_FILES_PREFIX}socioeconomics/indicators_population.csv".freeze
  POPULATION_GROWTH_FILEPATH =
    "#{CW_FILES_PREFIX}socioeconomics/indicators_population_growth.csv".freeze

  def call
    cleanup

    load_csvs

    import_csv(@gdp_csv, :gdp, :gdp_rank)
    import_csv(@gdp_per_capita_csv, :gdp_per_capita, :gdp_per_capita_rank)
    import_csv(@population_csv, :population, :population_rank)
    import_csv(@population_growth_csv, :population_growth, :population_growth_rank)
  end

  private

  def cleanup
    Socioeconomic::Indicator.delete_all
  end

  def load_csvs
    @gdp_csv =
      S3CSVReader.read(GDP_FILEPATH)
    @gdp_per_capita_csv =
      S3CSVReader.read(GDP_PER_CAPITA_FILEPATH)
    @population_csv =
      S3CSVReader.read(POPULATION_FILEPATH)
    @population_growth_csv =
      S3CSVReader.read(POPULATION_GROWTH_FILEPATH)
  end

  def parse_row(row)
    row.each_with_object(
      Hash.new { |hash, key| hash[key] = {} }
    ) do |(key, value), result|
      year = key.to_s.scan(/\d{4}/).first
      if year
        attribute = key.to_s.include?('rank') ? :rank : :value
        result[year][attribute] = value
      end
    end
  end

  def import_csv(csv, value_key, rank_key)
    csv.each do |row|
      location = Location.find_by(iso_code3: row[:iso_code3])
      if location
        parse_row(row).each do |year, values|
          Socioeconomic::Indicator.
            find_or_initialize_by(location: location, year: year).
            update!(value_key => values[:value], rank_key => values[:rank])
        end
      else
        Rails.logger.error "Location #{row[:iso]} not found"
      end
    end
  end
end
