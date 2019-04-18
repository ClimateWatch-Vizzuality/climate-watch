module Api
  module V1
    HistoricalEmissionsMetadata = Struct.new(
      :data_sources,
      :sectors,
      :gases,
      :locations
    ) do
      alias_method :read_attribute_for_serialization, :send
    end

    class HistoricalEmissionsController < ApiController
      def index
        unless valid_params(params)
          render json: {
            status: :bad_request,
            error: 'Please specify `source` and at least one of `location`,'\
                   '`sector` or `gas`'
          }, status: :bad_request and return
        end

        render json: ::HistoricalEmissions::Record.find_by_params(index_params),
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer,
               params: params
      end

      def meta
        render(
          json: HistoricalEmissionsMetadata.new(
            Api::V1::Data::HistoricalEmissions::DataSourceWithRelatedRecordsSearch.new.call,
            fetch_meta_sectors,
            ::HistoricalEmissions::Gas.all,
            Location.all
          ),
          serializer: Api::V1::HistoricalEmissions::MetadataSerializer
        )
      end

      private

      def fetch_meta_sectors
        return ::HistoricalEmissions::Sector.all if deeply_nested_sectors?

        ::HistoricalEmissions::Sector.first_and_second_level
      end

      def index_params
        return params if deeply_nested_sectors?

        not_deeply_nested_ids = ::HistoricalEmissions::Sector.first_and_second_level.pluck(:id)
        sector_ids = (params[:sector] || '').split(',') | not_deeply_nested_ids

        params.merge(sector: sector_ids.join(','))
      end

      def valid_params(params)
        params[:source] && (
          params[:location] || params[:sector] || params[:gas]
        )
      end

      def deeply_nested_sectors?
        params.fetch(:deeply_nested_sectors, 'true') == 'true'
      end
    end
  end
end
