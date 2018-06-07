module Api
  module V1
    module Data
      module HistoricalEmissions
        class SectorsController < ApiController
          def index
            render json: ::HistoricalEmissions::Sector.all,
                   adapter: :json,
                   each_serializer: Api::V1::Data::HistoricalEmissions::SectorSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
