module Api
  module V1
    class AuthController < ApiController
      include AuthHelper

      # rubocop:disable LineLength
      def login
        token = params[:token]

        redirect_to_api_gateway_login(api_v1_login_url, params[:network]) and return if token.blank? || !ensure_logged_in

        session[:user_token] = token
      end
      # rubocop:enable LineLength

      def logout
        session.delete(:user_token)
        session.delete(:current_user)
        redirect_to_api_gateway_logout(api_v1_login_url)
      end
    end
  end
end
