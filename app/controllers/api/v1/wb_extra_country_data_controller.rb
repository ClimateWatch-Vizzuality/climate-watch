module Api
  module V1
    class WbExtraCountryDataController < ApiController
      def index
        filtered_country_data = ::WbExtra::CountryData
        country_codes = {}
        Location.countries.each do |country_code|
          country_codes[country_code.id] = country_code.iso_code3
        end

        render json: group_by_country_code(
          country_codes, filtered_country_data.includes(:location)
        ), each_serializer: Api::V1::WbExtra::CountryDataSerializer
      end

      def show
        country = Location.find_by(location_type: 'COUNTRY',
                                   iso_code3: params[:iso])
        unless country
          render json: {
            error: 'Country not found',
            status: 404
          }, status: :not_found and return
        end

        filtered_country_data = ::WbExtra::CountryData.
          where(location: country).
          filter_by_dates(params[:startYear], params[:endYear])

        render json: filtered_country_data,
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
