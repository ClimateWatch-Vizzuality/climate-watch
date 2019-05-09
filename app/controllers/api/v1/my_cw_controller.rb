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
          @current_user = ::MyCw::User.new
          @current_user.errors.add(:id, :invalid)

          render json: {'code': '401', 'message': 'Not authorized'}, status: :unauthorized
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
