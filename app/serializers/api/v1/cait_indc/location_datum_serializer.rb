module Api
  module V1
    module CaitIndc
      class LocationDatumSerializer < ActiveModel::Serializer
        attribute :marker_lat, key: :lat
        attribute :marker_lng, key: :lng

        def marker_lat
          object&.location_datum&.marker_lat&.to_f
        end

        def marker_lng
          object&.location_datum&.marker_lng&.to_f
        end
      end
    end
  end
end
