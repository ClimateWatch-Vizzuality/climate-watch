module Api
  module V1
    module Data
      module NdcContent
        class DocumentsController < Api::V1::Data::ApiController
          def index
            documents = ::Indc::Document.order(:ordering)
            render json: documents,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::DocumentSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
