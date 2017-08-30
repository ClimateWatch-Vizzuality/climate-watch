module Api
  module V1
    class NdcsController < ApiController
      def index
        ndcs = ::CaitIndc::Indicator.
          includes(
            :indicator_labels,
            :category,
            values: [:indicator_label, :location]
          )

        render json: ndcs,
               each_serializer: Api::V1::CaitIndc::IndicatorSerializer
      end
    end
  end
end
