module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourcesController < ApiController
          def index
            render json: data_sources,
                   adapter: :json,
                   each_serializer: Api::V1::Data::HistoricalEmissions::DataSourceSerializer,
                   root: :data
          end

          private

          def data_sources
            Api::V1::Data::HistoricalEmissions::DataSourceWithRelatedRecordsSearch.new.call
          end
        end
      end
    end
  end
end
