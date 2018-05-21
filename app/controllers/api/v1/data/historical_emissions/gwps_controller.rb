module Api
  module V1
    module Data
      module HistoricalEmissions
        class GwpsController < ApiController
          def index
            render json: ::HistoricalEmissions::Gwp.all,
                   each_serializer: Api::V1::Data::HistoricalEmissions::GwpSerializer
          end
        end
      end
    end
  end
end
