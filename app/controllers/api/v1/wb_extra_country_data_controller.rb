module Api
  module V1
    class WbExtraCountryDataController < ApiController
      def show
        country = Location.where(location_type: "COUNTRY", iso_code3: params[:iso])
        
        if country.size == 0
          render json: {
            error: 'Country not found',
            status: 404
          }, status: :not_found and return
        end
        
        country_data = ::WbExtra::CountryData.where(location: country)
        filtered_country_data = filter_by_dates(country_data, params[:startYear], params[:endYear])
        
        render json: filtered_country_data,
               each_serializer: Api::V1::WbExtra::CountryDataSerializer
      end

      def filter_by_dates(country_data, start_year, end_year)
        filtered_country_data = country_data
        if start_year
          min_year = country_data.minimum(:year)
          start_year = min_year if min_year > start_year
          filtered_country_data = filtered_country_data.where("year >= ?", start_year)  
        end
        
        if end_year
          max_year = country_data.maximum(:year)
          end_year = max_year if max_year < end_year
          filtered_country_data = filtered_country_data.where("year <= ?", end_year)  
        end

        filtered_country_data
      end
    end
  end
end
