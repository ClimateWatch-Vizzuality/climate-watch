module Api
  module V1
    module Data
      module NdcSdg
        class SectorSerializer < ActiveModel::Serializer
          attribute :id
          attribute :name
          attribute :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
