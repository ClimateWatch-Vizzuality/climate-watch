module Api
  module V1
    class WbExtraCountryDataController < ApiController
      def index
        data = ::WbExtra::CountryData.
          includes(:location).
          order(:year)

        data = data.filter_by_start_year(params[:startYear]) if params[:startYear].present?
        data = data.filter_by_end_year(params[:endYear]) if params[:endYear].present?

        render json: data,
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

        data = ::WbExtra::CountryData.where(location: location)

        data = data.filter_by_start_year(params[:startYear]) if params[:startYear].present?
        data = data.filter_by_end_year(params[:endYear]) if params[:endYear].present?

        render json: data,
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
