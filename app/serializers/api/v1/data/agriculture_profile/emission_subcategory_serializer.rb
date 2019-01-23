module Api
  module V1
    module Data
      module AgricultureProfile
        class EmissionSubcategorySerializer < ActiveModel::Serializer
          has_one :emission_category
          has_many :emissions

          attribute :name
          attribute :short_name
          attribute :indicator_name
        end
      end
    end
  end
end