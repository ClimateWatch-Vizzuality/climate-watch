module Api
  module V1
    module CountryProfile
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :short_name
        attribute :metadata_source
        attribute :max_value

        has_many :values, serializer: ValueSerializer

        def values
          return object.values unless locations.present?

          object.values.includes(:location).where(locations: {iso_code3: locations})
        end

        def locations
          instance_options[:locations]
        end

        # used for _rank indicators only
        def max_value
          return unless object.slug.include? '_rank'

          object.values.maximum('value::integer')
        rescue ActiveRecord::StatementInvalid => e
          Appsignal.set_error(e)
          Rails.logger.error "Country Profile API Error max_value for #{object.slug} indicator"
        end
      end
    end
  end
end
