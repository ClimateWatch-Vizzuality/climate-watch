module Api
  module V1
    module CountryProfile
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name

        has_many :values, serializer: ValueSerializer
      end
    end
  end
end
