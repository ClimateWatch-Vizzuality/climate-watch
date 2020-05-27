module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourceSerializer < CustomHashSerializer
          attributes :id, :name, :display_name, :location_ids, :sector_ids, :gas_ids,
            :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
