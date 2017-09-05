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

        if location_list
          indicators = indicators.where(
            values: { locations: { iso_code3: location_list } }
          )
        end

        if params[:filter] == 'map'
          indicators = indicators.where(on_map: true)
        end

        if params[:filter] == 'summary'
          indicators = indicators.where(summary_list: true)
        end

        categories = ::CaitIndc::Category.all

        render json: NdcIndicators.new(indicators, categories),
               serializer: Api::V1::CaitIndc::NdcIndicatorsSerializer
      end

      private

      def location_list
        params[:location].blank? ?
          nil :
          params[:location].split(',')
      end

    end
  end
end
