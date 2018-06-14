module Api
  module V1
    module Data
      module NdcContent
        class CategorySerializer < ActiveModel::Serializer
          attributes :id, :slug, :name, :parent_id
        end
      end
    end
  end
end
