module Api
  module V1
    module Data
      class NdcContentController < Api::V1::Data::ApiController
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call
          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::NdcContent::NdcContentSerializer,
                 params: params,
                 root: :data
        end

        def meta
          set_links_header(
            [
              :data_sources, :indicators, :categories, :labels, :sectors
            ].map do |resource|
              {
                link: "/api/v1/data/ndc_content/#{resource}",
                rel: "meta #{resource}"
              }
            end + [{link: '/api/v1/locations/countries', rel: 'meta locations'}]
          )
        end

        def download
          csv_string = Api::V1::Data::NdcContentCsvContent.new(@filter).call
          send_data(
            csv_string,
            type: 'text/csv; charset=utf-8; header=present',
            disposition: 'attachment; filename=ndc_content.csv'
          )
        end

        private

        def parametrise_filter
          @filter = Data::NdcContentFilter.new(params)
        end
      end
    end
  end
end
