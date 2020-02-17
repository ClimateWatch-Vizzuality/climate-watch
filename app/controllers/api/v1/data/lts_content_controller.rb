module Api
  module V1
    module Data
      class LtsContentController < Api::V1::Data::ApiController
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
                link: "/api/v1/data/lts_content/#{resource}",
                rel: "meta #{resource}"
              }
            end + [{link: '/api/v1/locations/countries', rel: 'meta locations'}]
          )
        end

        def download
          zipped_download = Api::V1::Data::NdcContent::ZippedDownload.new(@filter)
          stream_file(zipped_download.filename) { zipped_download.call }
        end

        private

        def parametrise_filter
          params[:source_ids] = ::Indc::Source.lts.pluck(:id)
          @filter = Data::NdcContent::Filter.new(params)
        end
      end
    end
  end
end
