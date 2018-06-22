module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourcesController < ApiController
          def index
            render json: ::HistoricalEmissions::DataSource.all,
                   adapter: :json,
                   each_serializer: Api::V1::Data::HistoricalEmissions::DataSourceSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
