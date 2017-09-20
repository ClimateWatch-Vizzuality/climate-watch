module Api
  module V1
    HistoricalEmissionsMetadata = Struct.new(
      :data_sources,
      :sectors,
      :gases
    ) do
      alias_method :read_attribute_for_serialization, :send
    end

    class HistoricalEmissionsController < ApiController
      def index
        render json: ::HistoricalEmissions::Record.find_by_params(params),
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer,
               params: params
      end

      def meta
        args = [
          ::HistoricalEmissions::DataSource.all,
          ::HistoricalEmissions::Sector.all,
          ::HistoricalEmissions::Gas.all
        ]

        render json: HistoricalEmissionsMetadata.new(*args),
               serializer: Api::V1::HistoricalEmissions::MetadataSerializer
      end
    end
  end
end
