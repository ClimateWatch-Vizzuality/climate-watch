module Api
  module V1
    class WbExtraCountryDataController < ApiController
      def show
        country = Location.find_by(location_type: 'COUNTRY',
                                   iso_code3: params[:iso])

        unless country
          render json: {
            error: 'Country not found',
            status: 404
          }, status: :not_found and return
        end

        country_data = ::WbExtra::CountryData.where(location: country)
        filtered_country_data = filter_by_dates(
          country_data,
          params[:startYear],
          params[:endYear]
        )

        render json: filtered_country_data,
               each_serializer: Api::V1::WbExtra::CountryDataSerializer
      end

      private

      def filter_by_dates(country_data, start_year, end_year)
        filtered_country_data = country_data
        filtered_country_data = filter_by_start_year(filtered_country_data, start_year)
        filter_by_end_year(filtered_country_data, end_year)
      end

      def filter_by_start_year(filtered_country_data, start_year)
        if start_year
          min_year = filtered_country_data.minimum(:year)
          start_year = min_year if min_year > start_year
          filtered_country_data = filtered_country_data.where(
            'year >= ?', start_year
          )
        end
        filtered_country_data
      end

      def filter_by_end_year(filtered_country_data, end_year)
        if end_year
          max_year = filtered_country_data.maximum(:year)
          end_year = max_year if max_year < end_year
          filtered_country_data = filtered_country_data.where(
            'year <= ?', end_year
            )
        end
        filtered_country_data
      end
    end
  end
end
