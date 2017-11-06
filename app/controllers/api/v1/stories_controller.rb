module Api
  module V1
    class StoriesController < ApiController
      def index
        stories = Story.limit(stories_limit).order(:published_at)

        render json: stories, each_serializer: Api::V1::StorySerializer
      end

      private

      def stories_limit
        params[:limit] || 5
      end
    end
  end
end
