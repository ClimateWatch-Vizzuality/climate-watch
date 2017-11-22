module Api
  module V1
    class MyCwController < ApiController
      include AuthHelper
      before_action :current_user

      def current_user
        if @current_user.present?
          @current_user
        elsif ensure_logged_in
          @current_user
        else
          render status: 401 and return
        end
      end

      def resource_error(errors)
        render json: {
          code: 422,
          status: 'unprocessable entity',
          errors: errors
        }, status: :unprocessable_entity
      end
    end
  end
end
