module Api
  module V1
    NdcIndicators = Struct.new(:indicators, :categories) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      def index
        categories = ::CaitIndc::Category.all

        render json: NdcIndicators.new(indicators, categories),
               serializer: Api::V1::CaitIndc::NdcIndicatorsSerializer
      end

      private

      def indicators
        indicators = ::CaitIndc::Indicator.
          includes(
            :labels,
            :categories,
            values: [:label, :location]
          )

        if location_list
          indicators = indicators.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        indicators = indicators.where(on_map: true) if params[:filter] == 'map'

        indicators = indicators.where(summary_list: true) if
          params[:filter] == 'summary'

        indicators
      end

      def location_list
        if params[:location].blank?
          nil
        else
          params[:location].split(',')
        end
      end
    end
  end
end
