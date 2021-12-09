module CountryProfile
  class Indicator < ApplicationRecord
    has_many :values, class_name: 'CountryProfile::Value'

    validates :slug, presence: true, uniqueness: true

    class << self
      def sync_indc_indicators
        CountryProfile::Indicator.where(file: 'ndc_data.csv').each do |i|
          i.values.delete_all
          indc_indicator = Indc::Indicator.find_by(slug: i.slug)
          if indc_indicator.nil?
            Rails.logger.info "Cannot find INDC indicator #{i.slug} to perform sync"
            next
          end

          values = indc_indicator.values.joins(:document).where(indc_documents: {slug: 'first_ndc'}).map do |v|
            CountryProfile::Value.new(
              indicator: i,
              location: v.location,
              value: v.value
            )
          end

          CountryProfile::Value.import! values
        end
      end

      # For subnational actions city badge type indicator
      # we don't have not joined cities population data provided
      # that's why generating that data taking world bank population
      # and subtracting all joined cities population from it
      def generate_subnational_actions_missing_data
        indicator = CountryProfile::Indicator.find_by(slug: :city_badge_type)
        Rails.logger.info 'City badge type indicator does not exist' and return if indicator.nil?

        # maybe remove old values just in case
        min_year = indicator.values.minimum(:year)

        values_to_add = []

        wb_data = WbExtra::CountryData.
          filter_by_start_year(min_year).
          group_by { |c| [c.location_id, c.year] }

        indicator.
          values.
          group_by { |v| [v.location_id, v.year] }.
          each do |location_year, values|
            location_id, year = location_year
            wb_location_data = wb_data[location_year]
            next if wb_location_data.nil?

            cities_taking_part_population = values.sum { |v| v.value.to_i }
            country_population = wb_data[location_year].first.population

            values_to_add << CountryProfile::Value.new(
              indicator: indicator,
              category: 'Not Joined',
              location_id: location_id,
              year: year,
              value: country_population - cities_taking_part_population
            )
          end

        CountryProfile::Value.import! values_to_add
      end
    end
  end
end
