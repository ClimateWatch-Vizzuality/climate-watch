module Api
  module V1
    class ApiController < ActionController::API
      def not_found
        render json: {
          code: 404,
          status: "#{request.params[:endpoint]} not found"
        }, status: :not_found
      end
    end
  end
end
