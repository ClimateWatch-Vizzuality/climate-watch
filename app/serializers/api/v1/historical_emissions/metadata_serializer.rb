module Api
  module V1
    module HistoricalEmissions
      class MetadataSerializer < ActiveModel::Serializer
        attributes :data_source, :sector, :gas

        def data_source
          object.data_sources.map do |g|
            g.slice(:id, :name)
          end
        end

        def sector
          object.sectors.map do |g|
            g.slice(:id, :name)
          end
        end

        def gas
          object.gases.map do |g|
            g.slice(:id, :name)
          end
        end
      end
    end
  end
end
