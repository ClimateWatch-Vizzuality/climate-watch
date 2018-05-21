module Api
  module V1
    module Data
      class HistoricalEmissionsController < ApiController
        before_action :parametrise_filter, only: [:index, :download]

        def index
          @records = paginate @filter.call, per_page: @per_page
          render json: @records,
                 each_serializer: Api::V1::Data::HistoricalEmissions::RecordSerializer,
                 params: params
        end

        def meta
          # TODO: links to meta resource endpoints
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
