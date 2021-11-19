module Api
  module V1
    module CountryProfile
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :short_name
        attribute :metadata_source

        has_many :values, serializer: ValueSerializer
      end
    end
  end
end
