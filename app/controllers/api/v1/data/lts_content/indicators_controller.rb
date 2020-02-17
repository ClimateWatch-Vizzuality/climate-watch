module Api
  module V1
    module Data
      module LtsContent
        class IndicatorsController < Api::V1::Data::ApiController
          def index
            set_links_header(
              [
                {
                  link: '/api/v1/data/lts_content/data_sources',
                  rel: 'meta data_sources'
                }
              ]
            )
            source = ::Indc::Source.lts.pluck(:id)
            indicators = ::Indc::Indicator.where(source_id: source).includes(:categories).all
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
