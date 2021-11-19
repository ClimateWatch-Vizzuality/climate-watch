class ImportCountryProfile
  include ClimateWatchEngine::CSVImporter

  COUNTRY_KEY_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_key.csv".freeze

  SUBNATIONAL_CITIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_city.csv".freeze
  SUBNATIONAL_COMPANIES_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_company.csv".freeze
  SUBNATIONAL_COUNT_FILEPATH = "#{CW_FILES_PREFIX}country_profile/subnational_count.csv".freeze

  COUNTRY_CONTEXT_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_context.csv".freeze
  COUNTRY_ADAPTATION_FILEPATH = "#{CW_FILES_PREFIX}country_profile/country_adaptation.csv".freeze

  def call
    prepare_cache

    ActiveRecord::Base.transaction do
      cleanup
      import_indicators(COUNTRY_KEY_FILEPATH)

      import_subnational_cities(SUBNATIONAL_CITIES_FILEPATH)
      import_subnational_companies(SUBNATIONAL_COMPANIES_FILEPATH)
      import_subnational_count(SUBNATIONAL_COUNT_FILEPATH)

      import_country_context(COUNTRY_CONTEXT_FILEPATH)
      import_country_adaptation(COUNTRY_ADAPTATION_FILEPATH)
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
    @indicators = CountryProfile::Indicator.all.map { |i| [i.slug, i] }.to_h
  end

  def import_subnational_cities(path)
    indicator = CountryProfile::Indicator.find_by(slug: :badge_type)
    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      parse_years(row).each do |year, value|
        v = CountryProfile::Value.new

        v.indicator = indicator
        v.location = find_location(row[:iso])
        v.year = year
        v.value = value
        v.category = row[:badge_type]

        v.validate!

        values << v
      end
    end

    CountryProfile::Value.import! values, all_or_none: true
  end

  def import_subnational_companies(path)
    indicator = CountryProfile::Indicator.find_by(slug: :target_qualification)
    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      parse_years(row).each do |year, value|
        v = CountryProfile::Value.new

        v.indicator = indicator
        v.location = find_location(row[:iso])
        v.year = year
        v.value = value
        v.category = row[:target_qualification]

        v.validate!

        values << v
      end
    end

    CountryProfile::Value.import! values, all_or_none: true
  end

  def import_subnational_count(path)
    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      %w[city_commited city_ppl company_target company_commited].each do |indicator|
        values << build_value(row, indicator)
      end
    end

    CountryProfile::Value.import! values.compact, all_or_none: true
  end

  def import_country_context(path)
    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      %w[emissions_total
         emissions_capita
         emissions_gdp
         emissions_total_rank
         emissions_capita_rank
         emissions_gdp_rank
         population
         gdp_capita
         population_rank
         gdp_capita_rank].each do |indicator|
        values << build_value(row, indicator)
      end
    end

    CountryProfile::Value.import! values.compact, all_or_none: true
  end

  def import_country_adaptation(path)
    values = []

    import_each_with_logging(S3CSVReader.read(path), path) do |row|
      %w[vulnerability
         vulnerability_rank
         readiness
         readiness_rank
         hazard_5
         hazard_2
         hazard_3
         hazard_7
         hazard_1
         hazard_4
         hazard_8
         hazard_6
         hazard_9
         hazard_10
         hazard_11].each do |indicator|
        values << build_value(row, indicator)
      end
    end

    CountryProfile::Value.import! values.compact, all_or_none: true
  end

  def build_value(row, indicator)
    value = row[indicator.to_sym]
    return if value.blank?

    value = CountryProfile::Value.new(
      location: find_location(row[:iso] || row[:country]),
      indicator: find_indicator(indicator),
      value: value
    )
    value.validate!
    value
  end

  def find_location(iso)
    return if iso.blank?

    @locations[iso] or raise ActiveRecord::RecordNotFound, "Cannot find location with iso code #{iso}"
  end

  def find_indicator(slug)
    return if slug.blank?

    @indicators[slug] or raise ActiveRecord::RecordNotFound, "Cannot find indicator with code #{slug}"
  end

  def parse_years(row)
    row.headers.grep(/\d{4}/).reduce({}) do |acc, year|
      next acc unless row[year].present?

      acc.merge(year.to_s.to_i => row[year].to_f)
    end
  end
end
