module Api
  module V1
    class SocioeconomicsController < ApiController
      before_action :set_location

      def index
        indicators = @location.socioeconomic_indicators.order(:year)

        render json: indicators,
               each_serializer: Api::V1::Socioeconomic::IndicatorSerializer
      end

      def latest
        render json: @location.latest_socioeconomics.to_json
      end

      private

      def set_location
        @location = Location.find_by(iso_code3: params[:location_code])
      end
    end
  end
end
