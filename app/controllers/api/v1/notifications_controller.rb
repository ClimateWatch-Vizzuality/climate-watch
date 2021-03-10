module Api
  module V1
    class NotificationsController < ApiController
      def index
        notifications = Notification.order(created_at: :desc).all
        render json: notifications, each_serializer: Api::V1::NotificationSerializer
      end
    end
  end
end
