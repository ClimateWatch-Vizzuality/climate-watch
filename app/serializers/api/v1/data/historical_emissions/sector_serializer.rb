module Api
  module V1
    module Data
      module HistoricalEmissions
        class SectorSerializer < ActiveModel::Serializer
          attributes :id, :name, :parent_id, :data_source_id, :annex_type,
            :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
