module Api
  module V1
    module Data
      class HistoricalEmissionsController < Api::V1::Data::ApiController
        include Streamable
        before_action :parametrise_filter, only: [:index, :download]
        before_action :parametrise_metadata_filter, only: [:download]

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
            [:data_sources, :gwps, :gases, :sectors].map do |he_resource|
              {
                link: "/api/v1/data/historical_emissions/#{he_resource}",
                rel: "meta #{he_resource}"
              }
            end + [{link: '/api/v1/locations/regions', rel: 'meta locations'}]
          )
        end

        def download
          filename = 'historical_emissions'
          metadata_filename = 'sources.csv'
          zipped_download = Api::V1::Data::ZippedDownload.new(filename)
          zipped_download.add_file_content(
            Api::V1::Data::HistoricalEmissionsCsvContent.new(@filter).call,
            filename + '.csv'
          )
          zipped_download.add_file_content(
            Api::V1::Data::MetadataCsvContent.new(@metadata_filter).call,
            metadata_filename
          )
          stream_file(filename) { zipped_download.call }
        end

        private

        def parametrise_filter
          @filter = Data::HistoricalEmissionsFilter.new(params)
        end

        def parametrise_metadata_filter
          source_names =
            if params[:source_ids].present?
              sources = ::Indc::Source.where(id: params[:source_ids])
              sources.pluck(:name).map do |name|
                "historical_emissions_#{name.downcase}" # careful UNFCCC
              end
            else
              %w(
                historical_emissions_pik
                historical_emissions_cait
                historical_emissions_unfccc
              )
            end
          @metadata_filter = Api::V1::Data::MetadataFilter.new(
            source_names: source_names
          )
        end
      end
    end
  end
end
