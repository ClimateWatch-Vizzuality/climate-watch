module Api
  module V1
    module WbExtra
      class CountryDataSerializer < ActiveModel::Serializer
        attribute :population
        attribute :GDP
        attribute :year
      end
    end
  end
end
