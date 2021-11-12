class ImportWbExtra
  POPULATION_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/population.csv".freeze
  GDP_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/gdp.csv".freeze
  US_POPULATION_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/us_population.csv".freeze
  US_GDP_FILEPATH = "#{CW_FILES_PREFIX}wb_extra/us_gdp.csv".freeze

  def call
    prepare_cache

    ActiveRecord::Base.transaction do
      cleanup
      load_csvs
      read_data
      import_data
    end
  end

  private

  def cleanup
    WbExtra::CountryData.delete_all
  end

  def prepare_cache
    @locations = Location.all.map { |l| [l.iso_code3, l] }.to_h
  end

  def load_csvs
    @population = S3CSVReader.read(POPULATION_FILEPATH).map(&:to_h)
    @us_population = S3CSVReader.read(US_POPULATION_FILEPATH).map(&:to_h)
    @gdp = S3CSVReader.read(GDP_FILEPATH).map(&:to_h)
    @us_gdp = S3CSVReader.read(US_GDP_FILEPATH).map(&:to_h)
  end

  def read_data
    @population_by_location = {}
    @gdp_by_location = {}

    @population_by_location.merge!(parse_data(@population))
    @population_by_location.merge!(parse_data(@us_population))
    @gdp_by_location.merge!(parse_data(@gdp))
    @gdp_by_location.merge!(parse_data(@us_gdp))
    @year_range = [
      @population_by_location.values.map(&:keys),
      @gdp_by_location.values.map(&:keys)
    ].flatten.uniq
  end

  def import_data
    all_locations = Location.all
    not_included_locations = []
    location_data = []

    all_locations.each do |location|
      location_code = location.iso_code3

      if @population_by_location[location_code]
        @year_range.each do |year|
          location_data << build_location_data(location_code, year)
        end
      else
        not_included_locations << location_code
      end
    end

    WbExtra::CountryData.import! location_data.compact

    Rails.logger.info "Locations not included in the data
      #{not_included_locations.uniq}"
  end

  def build_location_data(location_code, year)
    gdp = @gdp_by_location.dig(location_code, year)&.to_f
    population = @population_by_location.dig(location_code, year)&.to_f
    return if gdp.nil? && population.nil?

    WbExtra::CountryData.new(
      location: find_location(location_code),
      year: year,
      population: population,
      gdp: gdp
    )
  end

  def parse_data(csv_data)
    parsed_data = {}
    csv_data.each do |row|
      location_code = row[:country_code] || row[:state]
      parse_years(row).each do |year, value|
        parsed_data[location_code] ||= {}
        parsed_data[location_code][year] = value == 'null' ? nil : value
      end
    end
    parsed_data
  end

  def find_location(iso)
    return if iso.blank?

    @locations[iso] or raise ActiveRecord::RecordNotFound, "Cannot find location with iso code #{iso}"
  end

  def parse_years(row)
    row.keys.grep(/\d{4}/).reduce({}) do |acc, year|
      next acc unless row[year].present?

      acc.merge(year.to_s.to_i => row[year].to_f)
    end
  end
end
