module Api
  module V1
    class MyCwController < ApiController
      include AuthHelper
      before_action :current_user

      def current_user
        if Rails.env.development?
          session[:current_user] = { user_id: 1 }
          return
        end

        if session[:current_user].present?
          session[:current_user]
        elsif ensure_logged_in
          session[:current_user]
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