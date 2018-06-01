module Api
  module V1
    module Data
      module HistoricalEmissions
        class GasesController < ApiController
          def index
            render json: ::HistoricalEmissions::Gas.all,
                   adapter: :json,
                   each_serializer: Api::V1::Data::HistoricalEmissions::GasSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
