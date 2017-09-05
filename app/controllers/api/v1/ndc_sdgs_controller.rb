module Api
  module V1
    class NdcSdgsController < ApiController
      def show
        @ndc = Ndc.joins(:location).where(
          'locations.iso_code3' => params[:code].upcase
        ).first
        render status: :not_found and return unless @ndc
        render json: @ndc,
               serializer: Api::V1::NdcSdg::NdcSerializer
      end
    end
  end
end
