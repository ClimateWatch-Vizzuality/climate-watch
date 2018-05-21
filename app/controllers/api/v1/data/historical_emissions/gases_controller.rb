module Api
  module V1
    module Data
      module HistoricalEmissions
        class GasesController < ApiController
          def index
            render json: ::HistoricalEmissions::Gas.all,
                   each_serializer: Api::V1::Data::HistoricalEmissions::GasSerializer
          end
        end
      end
    end
  end
end
