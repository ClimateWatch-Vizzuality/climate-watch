module Api
  module V1
    class HistoricalEmissionsController < ApiController
      def index
        render json: records,
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer,
               params: params
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
