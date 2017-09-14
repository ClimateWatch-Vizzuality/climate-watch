module Api
  module V1
    class HistoricalEmissionsController < ApiController

      def index
        rs = records_specific
        render json: records_global + rs,
               each_serializer: Api::V1::HistoricalEmissions::RecordSerializer,
               params: params.merge(location: location_list),
               records_specific: rs
      end

      private

      def records_global
        global = ::HistoricalEmissions::Record.
          includes(
            :location,
            :data_source,
            :sector,
            :gas
          ).
          where(locations: {iso_code3: 'WORLD'})

          filter_parameters(global)
      end

      def records_specific
        specific = ::HistoricalEmissions::Record.
          includes(
            :location,
            :data_source,
            :sector,
            :gas
          )

        filter_parameters(filter_location(specific))
      end

      def filter_location(records)
        if location_list
          records = records.where(
            locations: {iso_code3: location_list}
          )
        end

        records
      end

      def filter_parameters(records)
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
