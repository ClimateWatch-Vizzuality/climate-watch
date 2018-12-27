module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatProductionsController < Api::V1::Data::ApiController
          def index
            meat = ::AgricultureProfile::MeatProduction.filter(params)

            render json: meat,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::MeatProductionSerializer,
                   root: :data
          end
        end
      end
    end
  end
end