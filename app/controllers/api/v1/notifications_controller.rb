module Api
  module V1
    class NotificationsController < ApiController
      def index
        notifications = Notification.where('date <= ?', DateTime.now).order(date: :desc).take(9)
        render json: notifications, each_serializer: Api::V1::NotificationSerializer
      end
    end
  end
end
