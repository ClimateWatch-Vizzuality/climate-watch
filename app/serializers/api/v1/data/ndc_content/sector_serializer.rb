module Api
  module V1
    module Data
      module NdcContent
        class SectorSerializer < ActiveModel::Serializer
          attributes :id, :name, :parent_id, :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
