module Api
  module V1
    module Locations
      class CountriesController < ApiController
        def index
          countries = Location.
            where(
              location_type: 'COUNTRY',
              show_in_cw: true
            ).or(
              Location.where(
                iso_code3: 'EUU'
              )
            ).order(:wri_standard_name)

          render json: countries,
                 each_serializer: Api::V1::LocationSerializer,
                 topojson: params.key?(:topojson)
        end
      end
    end
  end
end
