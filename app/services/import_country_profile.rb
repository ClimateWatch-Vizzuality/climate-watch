class ImportCountryProfile
  include ClimateWatchEngine::CSVImporter

  CITIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/cities_running_totals.csv".freeze
  COMPANIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/companies_running_totals.csv".freeze

  def call
    prepare_cache

    ActiveRecord::Base.transaction do
      cleanup
      import_cities
      import_companies
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

  def import_cities
    indicator = CountryProfile::Indicator.create(slug: :cities_running_totals)
    values = []

    import_each_with_logging(S3CSVReader.read(CITIES_FILEPATH), CITIES_FILEPATH) do |row|
      parse_years(row).each do |year, value|
        v = CountryProfile::Value.new

        v.indicator = indicator
        v.location = find_location(row[:country_iso_code])
        v.year = year
        v.value = value
        v.category = row[:latest_badge_type]

        v.validate!

        values << v
      end
    end

    CountryProfile::Value.import! values, all_or_none: true
  end

  def import_companies
    indicator = CountryProfile::Indicator.create(slug: :companies_running_totals)
    values = []

    import_each_with_logging(S3CSVReader.read(COMPANIES_FILEPATH), COMPANIES_FILEPATH) do |row|
      parse_years(row).each do |year, value|
        v = CountryProfile::Value.new

        v.indicator = indicator
        v.location = find_location(row[:iso_code])
        v.year = year
        v.value = value
        v.category = row[:target_qualification_homogenized]

        v.validate!

        values << v
      end
    end

    CountryProfile::Value.import! values, all_or_none: true
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
