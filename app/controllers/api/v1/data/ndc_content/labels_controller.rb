module Api
  module V1
    module Data
      module NdcContent
        class LabelsController < Api::V1::Data::ApiController
          def index
            set_links_header(
              [
                {
                  link: '/api/v1/data/ndc_content/indicators',
                  rel: 'meta indicators'
                }
              ]
            )
            labels = ::Indc::Label.all
            render json: labels,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::LabelSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
