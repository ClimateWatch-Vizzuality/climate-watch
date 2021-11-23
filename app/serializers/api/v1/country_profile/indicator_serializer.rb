module Api
  module V1
    module CountryProfile
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :short_name
        attribute :metadata_source

        has_many :values, serializer: ValueSerializer

        def values
          return object.values unless locations.present?

          object.values.includes(:location).where(locations: {iso_code3: locations})
        end

        def locations
          instance_options[:locations]
        end
      end
    end
  end
end
