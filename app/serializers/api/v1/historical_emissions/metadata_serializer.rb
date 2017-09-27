module Api
  module V1
    module HistoricalEmissions
      class MetadataSerializer < ActiveModel::Serializer
        attributes :data_sources, :sectors, :gases, :locations

        def data_sources
          object.data_sources.map do |g|
            g.slice(:id, :name, :location_ids, :sector_ids, :gas_ids)
          end
        end

        def sectors
          object.sectors.map do |g|
            g.slice(:id, :name)
          end
        end

        def gases
          object.gases.map do |g|
            g.slice(:id, :name)
          end
        end

        def locations
          object.locations.map do |l|
            l.slice(:id, :iso_code3)
          end
        end
      end
    end
  end
end
