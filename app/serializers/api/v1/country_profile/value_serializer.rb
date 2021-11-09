module Api
  module V1
    module CountryProfile
      class ValueSerializer < ActiveModel::Serializer
        attribute :location_id
        attribute :indicator_id
        attribute :category
        attribute :year
        attribute :value
      end
    end
  end
end
