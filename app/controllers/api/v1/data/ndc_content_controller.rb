module Api
  module V1
    module Data
      class NdcContentController < Api::V1::Data::ApiController
        include Streamable
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call
          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::NdcContent::NdcContentSerializer,
                 params: params,
                 root: :data,
                 meta: @filter.meta
        end

        def meta
          set_links_header(
            [
              :data_sources, :indicators, :categories, :sectors
            ].map do |resource|
              {
                link: "/api/v1/data/ndc_content/#{resource}",
                rel: "meta #{resource}"
              }
            end + [{link: '/api/v1/locations/countries', rel: 'meta locations'}]
          )
        end

        def download
          stream_file('ndc_content') do |stream|
            Api::V1::Data::NdcContentCsvContent.new(@filter, stream).call
          end
        end

        private

        def parametrise_filter
          @filter = Data::NdcContentFilter.new(params)
        end
      end
    end
  end
end
