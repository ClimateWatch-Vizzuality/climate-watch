module Api
  module V1
    module Data
      module NdcContent
        class CategoriesController < Api::V1::Data::ApiController
          def index
            categories = ::Indc::Category.includes(:category_type).
              joins(:indicators).
              where(indc_indicators: {source_id: source}).
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

          private

          def source
            ::Indc::Source.non_lts.pluck(:id)
          end
        end
      end
    end
  end
end
