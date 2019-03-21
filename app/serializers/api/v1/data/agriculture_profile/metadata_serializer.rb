module Api
  module V1
    module Data
      module AgricultureProfile
        class MetadataSerializer < ActiveModel::Serializer
          attributes :short_name, :indicator, :category,
                     :subcategory, :unit
        end
      end
    end
  end
end
