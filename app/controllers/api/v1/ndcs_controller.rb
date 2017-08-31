module Api
  module V1
    NdcIndicators = Struct.new(:indicators, :locations) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      def index
        indicators = ::CaitIndc::Indicator.
          includes(
            :labels,
            :category,
            values: [:label, :location]
          )

        locations = Location.includes(:location_datum)

        render json: NdcIndicators.new(indicators, locations),
               serializer: Api::V1::CaitIndc::NdcIndicatorsSerializer
      end
    end
  end
end
