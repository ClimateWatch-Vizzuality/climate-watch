class ImportCountryProfile
  include ClimateWatchEngine::CSVImporter

  COUNTRY_KEY_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_key.csv".freeze

  SUBNATIONAL_CITIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_city.csv".freeze
  SUBNATIONAL_COMPANIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_company.csv".freeze
  SUBNATIONAL_COUNT_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_count.csv".freeze

  COUNTRY_CONTEXT_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_context.csv".freeze
  COUNTRY_ADAPTATION_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_adaptation.csv".freeze

  COUNTRY_DRIVER_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_driver.csv".freeze
  COUNTRY_DRIVER_ELE_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_driver_electricity.csv".freeze

  RE_COST_FILEPATH = "#{CW_FILES_PREFIX}country_profile/re_cost.csv".freeze
  RE_EMPLOYMENT_FILEPATH = "#{CW_FILES_PREFIX}country_profile/re_employment.csv".freeze

  def call
    prepare_cache

    ActiveRecord::Base.transaction do
      cleanup
      import_indicators(COUNTRY_KEY_FILEPATH)

      import_time_series(SUBNATIONAL_CITIES_FILEPATH, :city_badge_type)
      import_time_series(SUBNATIONAL_COMPANIES_FILEPATH, :company_target_qualification)
      import_time_series(COUNTRY_DRIVER_ELE_FILEPATH, :electricity_consumption)
      import_time_series(RE_COST_FILEPATH, :cost_by_technology)
      import_time_series(RE_EMPLOYMENT_FILEPATH, :employment_by_technology)

      import_multiple_columns_file(SUBNATIONAL_COUNT_FILEPATH)
      import_multiple_columns_file(COUNTRY_CONTEXT_FILEPATH)
      import_multiple_columns_file(COUNTRY_ADAPTATION_FILEPATH)
      import_multiple_columns_file(COUNTRY_DRIVER_FILEPATH)

      sync_indc_indicators
      generate_subnational_actions_missing_data
    end
  end

  private

  def prepare_cache
    @locations = Location.all.map { |l| [l.iso_code3, l] }.to_h
  end

  def cleanup
    CountryProfile::Value.delete_all
    CountryProfile::Indicator.delete_all
  end

  def import_indicators(path)
    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      CountryProfile::Indicator.create_with(
        name: row[:long_name],
        short_name: row[:short_name],
        file: row[:file],
        metadata_source: row[:metadata_info_button]
      ).find_or_create_by!(
        slug: row[:column_name]
      )
    end
  end

  def import_time_series(path, indicator_slug)
    indicator = CountryProfile::Indicator.find_by(slug: indicator_slug)
    if indicator.nil?
      raise "#{File.basename(path)} Indicator #{indicator_slug} does not exist, check country_key file"
    end

    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      parse_years(row).each do |year, value|
        v = CountryProfile::Value.new

        v.indicator = indicator
        v.location = find_location(row[:iso])
        v.year = year
        v.value = value
        v.category = row[indicator_slug.to_sym]

        v.validate!

        values << v
      end
    end

    CountryProfile::Value.import! values
  end

  def import_multiple_columns_file(path)
    basename = File.basename(path)
    indicators = CountryProfile::Indicator.where(file: basename)

    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      indicators.each do |indicator|
        values << build_value(row, indicator)
      end
    end

    CountryProfile::Value.import! values.compact
  end

  def sync_indc_indicators
    CountryProfile::Indicator.sync_indc_indicators
  end

  def generate_subnational_actions_missing_data
    CountryProfile::Indicator.generate_subnational_actions_missing_data
  end

  def build_value(row, indicator)
    raise "Column for #{indicator.slug} does not exist" unless row.headers.include?(indicator.slug.to_sym)

    value = row[indicator.slug.to_sym]
    return if value.blank?

    value = CountryProfile::Value.new(
      location: find_location(row[:iso] || row[:country]),
      indicator: indicator,
      value: value
    )
    value.validate!
    value
  end

  def find_location(iso)
    return if iso.blank?

    @locations[iso] or raise ActiveRecord::RecordNotFound, "Cannot find location with iso code #{iso}"
  end

  def parse_years(row)
    row.headers.grep(/\d{4}/).reduce({}) do |acc, year|
      next acc unless row[year].present?

      acc.merge(year.to_s.to_i => row[year].to_f)
    end
  end
end
