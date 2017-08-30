module Api
  module V1
    class NdcsController < ApiController
      def index
        ndcs = ::CaitIndc::Indicator.
          includes(
            :labels,
            :category,
            values: [:label, :location]
          )

        render json: ndcs,
               each_serializer: Api::V1::CaitIndc::IndicatorSerializer
      end
    end
  end
end
