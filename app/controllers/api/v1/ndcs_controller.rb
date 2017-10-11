module Api
  module V1
    NdcIndicators = Struct.new(:indicators, :categories) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      def index
        categories = ::Indc::Category.all

        render json: NdcIndicators.new(indicators, categories),
               serializer: Api::V1::Indc::NdcIndicatorsSerializer
      end

      private

      def indicators
        indicators = ::Indc::Indicator.includes(
          :labels,
          :categories,
          values: [:label, :location]
        )

        if location_list
          indicators = indicators.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        if params[:filter]
          indicators = indicators.where(
            indc_categories: {category_type: params[:filter]}
          )
        end

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
