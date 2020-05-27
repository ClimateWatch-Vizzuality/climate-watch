module Api
  module V1
    module Data
      module NdcContent
        class CategoryTypeSerializer < ActiveModel::Serializer
          attributes :id, :name, :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
