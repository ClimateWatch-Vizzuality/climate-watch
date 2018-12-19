module Api
  module V1
    module Data
      module AgricultureProfile
        class EmissionsController < Api::V1::Data::ApiController
          def index
            emissions = if params[:location_id]
                          ::AgricultureProfile::Emission.by_location(params[:location_id])
                        else
                          ::AgricultureProfile::Emission.all
                        end
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