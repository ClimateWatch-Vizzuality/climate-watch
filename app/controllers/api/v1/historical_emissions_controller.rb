module Api
  module V1
    class HistoricalEmissionsController < ApiController
      def index
        render json: records,
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer
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

        if location_list
          records = records.where(
            locations: {iso_code3: location_list}
          )
        end

        if params[:gas]
          records = records.where(
            historical_emissions_gases: {id: params[:gas]}
          )
        end

        if params[:source]
          records = records.where(
            historical_emissions_data_sources: {id: params[:source]}
          )
        end

        if params[:sector]
          records = records.where(
            historical_emissions_sectors: {id: params[:sector]}
          )
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
