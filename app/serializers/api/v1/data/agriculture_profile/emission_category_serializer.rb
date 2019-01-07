module Api
  module V1
    module Data
      module AgricultureProfile
        class EmissionCategorySerializer < ActiveModel::Serializer
          has_many :emission_subcategories

          attribute :name
          attribute :unit
        end
      end
    end
  end
end