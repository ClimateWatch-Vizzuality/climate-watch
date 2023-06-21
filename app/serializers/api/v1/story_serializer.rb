module Api
  module V1
    class StorySerializer < ActiveModel::Serializer
      attribute :title
      attribute :link
      attribute :background_image_url
      attribute :tags
      attribute :published_at

      def background_image_url
        object.resized_background_image_url
      end
    end
  end
end
