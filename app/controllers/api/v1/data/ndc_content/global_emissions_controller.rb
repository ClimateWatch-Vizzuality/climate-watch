module Api
  module V1
    module Data
      module NdcContent
        class GlobalEmissionsController < Api::V1::Data::ApiController
          def index
            global_emissions = ::Indc::GlobalEmission.order(:year)
            render json: global_emissions,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::GlobalEmissionSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
