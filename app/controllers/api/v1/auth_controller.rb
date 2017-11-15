module Api
  module V1
    class AuthController < ApiController
      include AuthHelper
      def login
        token = params[:token]

        redirect_to_api_gateway_login(api_v1_login_url) and return if token.blank? || !ensure_logged_in

        # TODO: The commented code should be used if we decide to have a session in the server
        # session[:user_token] = token
      end

      def logout
        # session.delete(:user_token)
        # session.delete(:current_user)
        redirect_to_api_gateway_logout(api_v1_login_url)
      end
    end
  end
end