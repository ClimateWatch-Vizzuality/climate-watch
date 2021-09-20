module Api
  module V1
    class StoriesController < ApiController
      def index
        stories = Story.order(published_at: :desc).limit(params[:limit].try(:to_i) || 5)
        render json: stories, each_serializer: Api::V1::StorySerializer
      end
    end
  end
end
