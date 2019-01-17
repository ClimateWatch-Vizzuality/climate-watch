module Api
  module V1
    module Data
      module AgricultureProfile
        class EmissionsController < Api::V1::Data::ApiController
          def index
            emissions = ::AgricultureProfile::Emission.filter(params)

            render json: emissions,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::EmissionSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
