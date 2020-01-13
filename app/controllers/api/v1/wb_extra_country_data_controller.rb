module Api
  module V1
    class WbExtraCountryDataController < ApiController
      def index
        collection = ::WbExtra::CountryData.
          includes(:location).
          filter_by_dates(params[:startYear], params[:endYear]).
          order(:year).
          all

        render json: collection,
               serializer: Api::V1::WbExtra::IndexSerializer
      end

      def show
        location = Location.find_by(iso_code3: params[:code])

        unless location
          render json: {
            error: 'Location not found',
            status: 404
          }, status: :not_found and return
        end

        collection = ::WbExtra::CountryData.
          where(location: location).
          filter_by_dates(params[:startYear], params[:endYear])

        render json: collection,
               each_serializer: Api::V1::WbExtra::CountryDataSerializer
      end

      private

      def group_by_country_code(country_codes, data)
        data.select(:population, :gdp, :year, :location_id).
          group_by do |filtered_country|
            country_codes[filtered_country.location_id]
          end
      end
    end
  end
end
