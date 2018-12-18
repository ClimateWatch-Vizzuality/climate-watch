module Api
  module V1
    class UpdateSerializer < ActiveModel::Serializer
      attribute :category
      attribute :link
      attribute :description
      attribute :updated_at, key: :date

      def updated_at
        object.updated_at.strftime('%d %B %Y')
      end
    end
  end
end
