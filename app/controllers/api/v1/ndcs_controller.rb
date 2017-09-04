module Api
  module V1
    NdcIndicators = Struct.new(:indicators, :categories) do
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

        categories = ::CaitIndc::Category.all

        render json: NdcIndicators.new(indicators, categories),
               serializer: Api::V1::CaitIndc::NdcIndicatorsSerializer
      end
    end
  end
end
