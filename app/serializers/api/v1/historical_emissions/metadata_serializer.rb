module Api
  module V1
    module HistoricalEmissions
      class MetadataSerializer < ActiveModel::Serializer
        attributes :data_source, :sector, :gas, :location, :gwp

        def data_source
          object.data_sources.map do |g|
            g.
              slice(:id, :name, :location_ids, :sector_ids, :gas_ids, :gwp_ids).
              merge(source: "historical_emissions_#{g[:name]}")
          end
        end

        def sector
          object.sectors.map do |g|
            g.slice(:id, :name, :parent_id)
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

        def gwp
          object.gwps.map do |g|
            g.slice(:id, :name)
          end
        end
      end
    end
  end
end
