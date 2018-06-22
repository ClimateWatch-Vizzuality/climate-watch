module Api
  module V1
    module Data
      module NdcContent
        class IndicatorsController < Api::V1::Data::ApiController
          def index
            set_links_header(
              [
                {
                  link: '/api/v1/data/ndc_content/data_sources',
                  rel: 'meta data_sources'
                }
              ]
            )
            indicators = ::Indc::Indicator.includes(:categories).all
            render json: indicators,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::IndicatorSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
