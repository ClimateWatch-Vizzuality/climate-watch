module Api
  module V1
    module CountryProfile
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :category
        attribute :year
        attribute :value

        def location
          object.location.iso_code3
        end
      end
    end
  end
end
