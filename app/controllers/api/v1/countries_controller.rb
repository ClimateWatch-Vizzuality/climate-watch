module Api
  module V1
    class CountriesController < ApiController
      def index
        locations = Location.where(
          location_type: 'COUNTRY',
          show_in_cw: true
        )

        render json: locations,
               topojson: params.key?(:topojson)
      end
    end
  end
end
