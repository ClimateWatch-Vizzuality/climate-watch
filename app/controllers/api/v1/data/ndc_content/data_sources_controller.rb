module Api
  module V1
    module Data
      module NdcContent
        class DataSourcesController < Api::V1::Data::ApiController
          def index
            data_sources = ::Indc::Source.non_lts
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
