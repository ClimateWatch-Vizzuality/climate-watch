module Api
  module V1
    module Data
      module NdcContent
        class CountryEmissionsController < Api::V1::Data::ApiController
          def index
            country_emissions = ::Indc::CountryEmission.includes(:location)
            render json: country_emissions,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::CountryEmissionSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
