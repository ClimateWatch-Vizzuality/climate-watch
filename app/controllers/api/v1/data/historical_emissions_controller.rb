module Api
  module V1
    module Data
      class HistoricalEmissionsController < Api::V1::Data::ApiController
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call

          render json: @records,
                 adapter: :json,
                 each_serializer: Api::V1::Data::HistoricalEmissions::RecordSerializer,
                 params: params,
                 root: :data,
                 meta: {years: @filter.years}
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
          csv_string = Api::V1::Data::HistoricalEmissionsCsvContent.new(@filter).call
          send_data(
            csv_string,
            type: 'text/csv; charset=utf-8; header=present',
            disposition: 'attachment; filename=historical_emissions.csv'
          )
        end

        private

        def parametrise_filter
          @filter = Data::HistoricalEmissionsFilter.new(params)
        end
      end
    end
  end
end
