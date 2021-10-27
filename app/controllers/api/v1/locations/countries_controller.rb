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
          countries = countries.includes(:members) if includes_members?

          render json: countries,
                 each_serializer: Api::V1::LocationSerializer,
                 members: includes_members?,
                 topojson: includes_topojson?
        end

        private

        def includes_topojson?
          params[:topojson]&.downcase == 'true'
        end

        def includes_members?
          params[:members]&.downcase == 'true'
        end
      end
    end
  end
end
