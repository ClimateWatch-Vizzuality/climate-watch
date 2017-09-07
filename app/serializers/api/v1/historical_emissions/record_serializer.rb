module Api
  module V1
    module HistoricalEmissions
      class RecordSerializer < ActiveModel::Serializer
        belongs_to :location
        belongs_to :gas
        belongs_to :data_source, key: :source
        belongs_to :sector
        attribute :emissions

        def location
          object.location.iso_code3
        end

        def gas
          object.gas.name
        end

        def data_source
          object.data_source.name
        end

        def sector
          object.sector.name
        end
      end
    end
  end
end
