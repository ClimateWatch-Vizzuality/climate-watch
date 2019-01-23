module Api
  module V1
    module Data
      module AgricultureProfile
        class EmissionSerializer < ActiveModel::Serializer
          has_one :emission_subcategory
          attribute :values
        end
      end
    end
  end
end
