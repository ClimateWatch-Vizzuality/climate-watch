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

        filtered_country_data = ::WbExtra::CountryData.
          where(location: country).
          filter_by_dates(params[:startYear], params[:endYear])

        render json: filtered_country_data,
               each_serializer: Api::V1::WbExtra::CountryDataSerializer
      end
    end
  end
end
