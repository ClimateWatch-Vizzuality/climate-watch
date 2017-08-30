module Api
  module V1
    class NdcFullTextsController < BaseController
      def show
        @ndc = Ndc.joins(:location).where(
          'locations.iso_code3' => params[:code].upcase
        ).first
        render status: :not_found and return unless @ndc
        render html: @ndc.full_text.html_safe
      end
    end
  end
end
