module Api
  module V1
    module Data
      module NdcContent
        class CategoriesController < Api::V1::Data::ApiController
          def index
            categories = ::Indc::Category.all
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
