module Api
  module V1
    class NotificationSerializer < ActiveModel::Serializer
      attribute :id
      attribute :description
      attribute :date
    end
  end
end
