module Api
  module V1
    module Data
      module AgricultureProfile
        class CountryContextsController < Api::V1::Data::ApiController
          def index
            contexts = ::AgricultureProfile::CountryContext.filter(params)

            render json: contexts,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::CountryContextSerializer,
                   root: :data
          end
        end
      end
    end
  end
end