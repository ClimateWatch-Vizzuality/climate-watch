module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourcesController < ApiController
          def index
            render json: ::HistoricalEmissions::DataSource.all,
                   each_serializer: Api::V1::Data::HistoricalEmissions::DataSourceSerializer
          end
        end
      end
    end
  end
end
