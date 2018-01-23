module Api
  module V1
    class StorySerializer < ActiveModel::Serializer
      attribute :title
      attribute :link
      attribute :background_image_url
      attribute :tags
      attribute :published_at
    end
  end
end
