module Api
  module V1
    module Data
      class HistoricalEmissionsController < Api::V1::Data::ApiController
        include Streamable
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call

          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::HistoricalEmissions::RecordSerializer,
                 params: params,
                 root: :data,
                 meta: @filter.meta
        end

        def meta
          set_links_header(
            [:data_sources, :gases, :sectors].map do |he_resource|
              {
                link: "/api/v1/data/historical_emissions/#{he_resource}",
                rel: "meta #{he_resource}"
              }
            end + [{link: '/api/v1/locations/regions', rel: 'meta locations'}]
          )
        end

        def download
          zipped_download =
            Api::V1::Data::HistoricalEmissions::ZippedDownload.new(
              @filter,
              source_ids: params[:source_ids]
            )
          stream_file(zipped_download.filename) { zipped_download.call }
        end

        private

        def parametrise_filter
          @filter = Data::HistoricalEmissions::Filter.new(params)
        end
      end
    end
  end
end
