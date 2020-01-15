class ImportWbExtra
  POPULATION_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/population.csv".freeze
  GDP_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/gdp.csv".freeze
  FIRST_YEAR = 1960
  def call
    cleanup
    year_range
    load_csvs
    read_data
    import_data
  end

  private

  def cleanup
    WbExtra::CountryData.delete_all
  end

  def year_range
    current_year = DateTime.now.year
    @year_range = (FIRST_YEAR..current_year)
  end

  def load_csvs
    @population = S3CSVReader.read(POPULATION_FILEPATH).map(&:to_h)
    @gdp = S3CSVReader.read(GDP_FILEPATH).map(&:to_h)
  end

  def read_data
    @population_by_country = parse_data(@population)
    @gdp_by_country = parse_data(@gdp)
  end

  def import_data
    all_countries = Location.all
    not_included_countries = []

    all_countries.each do |country|
      country_code = country.iso_code3

      @year_range.map do |year|
        if @population_by_country[country_code]
          create_country_data(country_code, year)
        else
          not_included_countries << country_code
        end
      end
    end
    Rails.logger.info "Countries not included in the data
      #{not_included_countries.uniq}"
  end

  def create_country_data(country_code, year)
    year_index = (year - FIRST_YEAR)
    country_location = Location.find_by(
      iso_code3: country_code
    )

    WbExtra::CountryData.create(
      location: country_location,
      year: year,
      population: @population_by_country[country_code][year_index]&.to_f,
      gdp: @gdp_by_country[country_code][year_index]&.to_f
    )
  end

  def parse_data(csv_data)
    parsed_data = {}
    csv_data.each do |country_data|
      country_code = country_data[:country_code]
      parsed_data[country_code] = @year_range.map do |year|
        year_sym = year.to_s.to_sym
        country_data[year_sym] == 'null' ? nil : country_data[year_sym]
      end
    end
    parsed_data
  end
end
