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
          attribute :category_name
          attribute :category_id

          def category_name
            object.emission_category&.name
          end

          def category_id
            object.emission_category_id
          end
        end
      end
    end
  end
end
