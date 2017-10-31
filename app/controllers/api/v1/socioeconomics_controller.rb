module Api
  module V1
    class SocioeconomicsController < ApiController
      def index
        indicators = ::Socioeconomic::Indicator
                       .includes(:location)
                       .where(locations: {iso_code3: params[:location]})
                       .order(:year)

        render json: indicators,
               each_serializer: Api::V1::Socioeconomic::IndicatorSerializer
      end
    end
  end
end
