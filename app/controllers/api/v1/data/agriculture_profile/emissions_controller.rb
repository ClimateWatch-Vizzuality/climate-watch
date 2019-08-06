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
                   root: :data,
                   meta: meta
          end

          private

          def meta
            {
              emission_locations_with_data: ::AgricultureProfile::Emission.all_locations_iso_codes
            }
          end
        end
      end
    end
  end
end
