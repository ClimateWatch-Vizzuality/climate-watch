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
          links = (headers['Link'] || '').split(',').map(&:strip)
          [:data_sources, :gwps, :gases, :sectors].each do |he_resource|
            url = [
              '/api/v1/data/historical_emissions', he_resource
            ].join('/')
            links << %(<#{url}>; rel="meta #{he_resource}")
          end
          links << %(</api/v1/locations/regions>; rel="meta locations")
          headers['Link'] = links.join(', ')
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
