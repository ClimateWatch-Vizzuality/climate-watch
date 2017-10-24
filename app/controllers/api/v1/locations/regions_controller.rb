module Api
  module V1
    module Locations
      class RegionsController < ApiController
        def index
          regions = Location.where(
            location_type: 'REGION',
            show_in_cw: true
          ).includes(:members).order(:wri_standard_name)

          render json: regions,
                 each_serializer: Api::V1::LocationSerializer,
                 topojson: params.key?(:topojson)
        end
      end
    end
  end
end
