module Api
  module V1
    module Data
      class NdcSdgController < Api::V1::Data::ApiController
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call
          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::NdcSdg::NdcSdgSerializer,
                 params: params,
                 root: :data
        end

        def meta
          set_links_header(
            [:goals, :targets, :sectors].map do |resource|
              {
                link: "/api/v1/data/ndc_sdgs/#{resource}",
                rel: "meta #{resource}"
              }
            end + [{link: '/api/v1/locations/countries', rel: 'meta locations'}]
          )
        end

        def download
          csv_string = Api::V1::Data::NdcSdgCsvContent.new(@filter).call
          send_data(
            csv_string,
            type: 'text/csv; charset=utf-8; header=present',
            disposition: 'attachment; filename=ndc_sdgs.csv'
          )
        end

        private

        def parametrise_filter
          @filter = Data::NdcSdgFilter.new(params)
        end
      end
    end
  end
end
