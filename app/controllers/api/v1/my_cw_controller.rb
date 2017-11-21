module Api
  module V1
    class MyCwController < ApiController
      include AuthHelper
      before_action :current_user

      def current_user
        if Rails.env.development? || Rails.env.test?
          user_id = ::MyCw::User.first.present? ? ::MyCw::User.first.id : '1'
          session[:current_user] = {user_id: user_id}
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