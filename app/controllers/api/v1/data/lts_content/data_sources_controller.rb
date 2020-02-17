module Api
  module V1
    module Data
      module LtsContent
        class DataSourcesController < Api::V1::Data::ApiController
          def index
            data_sources = ::Indc::Source.lts
            render json: data_sources,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::DataSourceSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
