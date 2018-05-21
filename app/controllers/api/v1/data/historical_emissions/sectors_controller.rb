module Api
  module V1
    module Data
      module HistoricalEmissions
        class SectorsController < ApiController
          def index
            render json: ::HistoricalEmissions::Sector.all,
                   each_serializer: Api::V1::Data::HistoricalEmissions::SectorSerializer
          end
        end
      end
    end
  end
end
