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
        render json: records,
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

      private

      def records
        records = ::HistoricalEmissions::Record.
          includes(
            :location,
            :data_source,
            :sector,
            :gas
          )

        filters(records)
      end

      def filters(records)
        if location_list
          records = records.where(
            locations: {iso_code3: location_list}
          )
        end

        {
          historical_emissions_gases: :gas,
          historical_emissions_data_sources: :source,
          historical_emissions_sectors: :sector
        }.each do |k, v|
          records = records.where(k => {id: params[v]}) if params[v]
        end

        records
      end

      def location_list
        if params[:location].blank?
          nil
        else
          params[:location].split(',')
        end
      end
    end
  end
end
