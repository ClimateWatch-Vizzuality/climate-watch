module Api
  module V1
    module Data
      module NdcContent
        class CategoriesController < Api::V1::Data::ApiController
          def index
            categories = ::Indc::Category.includes(:category_type).
              where(
                'indc_category_types.name' => [
                  ::Indc::CategoryType::GLOBAL, ::Indc::CategoryType::OVERVIEW
                ]
              )
            render json: categories,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::CategorySerializer,
                   root: :data
          end
        end
      end
    end
  end
end
