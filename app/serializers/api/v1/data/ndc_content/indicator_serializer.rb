module Api
  module V1
    module Data
      module NdcContent
        class IndicatorSerializer < ActiveModel::Serializer
          attributes :id, :slug, :name, :description, :source_id, :category_ids
        end
      end
    end
  end
end
