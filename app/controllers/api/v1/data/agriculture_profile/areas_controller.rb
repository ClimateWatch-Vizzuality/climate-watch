module Api
  module V1
    module Data
      module AgricultureProfile
        class AreasController < Api::V1::Data::ApiController
          def index
            areas = ::AgricultureProfile::Area.filter(params)

            render json: areas,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::AreaSerializer,
                   root: :data,
                   meta: ::AgricultureProfile::Metadatum.areas
          end
        end
      end
    end
  end
end