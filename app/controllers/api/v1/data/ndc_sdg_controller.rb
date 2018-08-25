module Api
  module V1
    module Data
      class NdcSdgController < Api::V1::Data::ApiController
        include Streamable
        before_action :parametrise_filter, only: [:index, :download]
        before_action :parametrise_metadata_filter, only: [:download]

        def index
          @records = paginate @filter.call
          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::NdcSdg::NdcSdgSerializer,
                 params: params,
                 root: :data,
                 meta: @filter.meta
        end

        def meta
          set_links_header(
            [:goals, :targets, :sectors].map do |resource|
              {
                link: "/api/v1/data/ndc_sdg/#{resource}",
                rel: "meta #{resource}"
              }
            end + [{link: '/api/v1/locations/countries', rel: 'meta locations'}]
          )
        end

        def download
          filename = 'ndc_sdg'
          metadata_filename = 'sources.csv'
          zipped_download = Api::V1::Data::ZippedDownload.new(filename)
          zipped_download.add_file_content(
            Api::V1::Data::NdcSdgCsvContent.new(@filter).call,
            filename + 'csv'
          )
          zipped_download.add_file_content(
            Api::V1::Data::MetadataCsvContent.new(@metadata_filter).call,
            metadata_filename
          )
          stream_file(filename) { zipped_download.call }
        end

        private

        def parametrise_filter
          @filter = Data::NdcSdgFilter.new(params)
        end

        def parametrise_metadata_filter
          @metadata_filter = Api::V1::Data::MetadataFilter.new(
            source_names: ['ndc_sdc_all indicators']
          )
        end
      end
    end
  end
end
