module Api
  module V1
    class StoriesController < ApiController
      def index
        stories = Story.stories_filter(params[:tags], params[:limit])
        render json: stories, each_serializer: Api::V1::StorySerializer
      end
    end
  end
end
