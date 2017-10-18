module Api
  module V1
    class ApiController < ActionController::API
      rescue_from ActiveRecord::RecordNotFound, with: :resource_not_found

      def resource_not_found
        render json: {
          code: 404,
          status: 'resource not found'
        }, status: :not_found
      end

      def route_not_found
        render json: {
          code: 404,
          status: "#{request.params[:endpoint]} not found"
        }, status: :not_found
      end
    end
  end
end
