module Api
  module V1
    HistoricalEmissionsMetadata = Struct.new(
      :data_sources,
      :sectors,
      :gases,
      :gwps,
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

        render json: ::HistoricalEmissions::Record.find_by_params(params),
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer,
               params: params
      end

      def meta
        render(
          json: HistoricalEmissionsMetadata.new(
            merged_records(grouped_records),
            ::HistoricalEmissions::Sector.all,
            ::HistoricalEmissions::Gas.all,
            ::HistoricalEmissions::Gwp.all,
            Location.all
          ),
          serializer: Api::V1::HistoricalEmissions::MetadataSerializer
        )
      end

      private

      def valid_params(params)
        params[:source] && (
          params[:location] || params[:sector] || params[:gas]
        )
      end

      def grouped_records
        ::HistoricalEmissions::Record.
          select(
            <<-SQL
              data_source_id,
              ARRAY_AGG(DISTINCT sector_id) AS sector_ids,
              ARRAY_AGG(DISTINCT gas_id) AS gas_ids,
              ARRAY_AGG(DISTINCT location_id) AS location_ids,
              ARRAY_AGG(DISTINCT gwp_id) AS gwp_ids
            SQL
          ).
          group('data_source_id').
          as_json.
          map { |h| [h['data_source_id'], h.symbolize_keys.except(:id)] }.
          to_h
      end

      def merged_records(records)
        ::HistoricalEmissions::DataSource.
          all.map do |source|
            {
              id: source.id,
              name: source.name
            }.merge(records[source.id])
          end
      end
    end
  end
end
