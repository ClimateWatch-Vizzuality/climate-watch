module Api
  module V1
    module CountryProfile
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :indicator
        attribute :category
        attribute :year
        attribute :value

        def location
          object.location.iso_code3
        end

        def indicator
          object.indicator.slug
        end
      end
    end
  end
end
