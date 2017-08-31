module Api
  module V1
    module CaitIndc
      class NdcIndicatorsSerializer < ActiveModel::Serializer
        attribute :locations

        has_many :indicators,
                 serializer: IndicatorSerializer

        def locations
          serialized_values = ActiveModelSerializers::SerializableResource.new(
            object.locations,
            each_serializer: LocationDatumSerializer
          ).as_json

          object.locations.
            map { |l| l.iso_code3 }.
            zip(serialized_values).
            sort.
            to_h
        end
      end
    end
  end
end
