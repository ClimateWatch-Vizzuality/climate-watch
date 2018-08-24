module Api
  module V1
    module Data
      module NdcContent
        class CategoryTypeSerializer < ActiveModel::Serializer
          attributes :id, :name
        end
      end
    end
  end
end
