module Api
  module V1
    module HistoricalEmissions
      class MetadataSerializer < ActiveModel::Serializer
        attributes :data_source, :sector, :gas, :location

        def data_source
          object.data_sources.map do |g|
            g.
              slice(
                :id,
                :name,
                :display_name,
                :location_ids,
                :sector_ids,
                :gas_ids
              ).
              merge(source: g[:metadata_dataset])
          end
        end

        def sector
          object.sectors.map do |g|
            g.slice(:id, :name, :parent_id, :aggregated_sector_ids)
          end
        end

        def gas
          object.gases.map do |g|
            g.slice(:id, :name)
          end
        end

        def location
          object.locations.map do |l|
            l.slice(:id, :iso_code3, :wri_standard_name)
          end
        end
      end
    end
  end
end
