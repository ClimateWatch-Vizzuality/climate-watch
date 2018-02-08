module Api
  module V1
    class StoriesController < ApiController
      def index
        stories = storiesFilter(params[:tags])
        render json: stories, each_serializer: Api::V1::StorySerializer
      end

      private

      def storiesFilter tags
        taggedStories = taggedStories(tags)
        return taggedStories if taggedStories.length >= 5
        moreStories = untaggedStories
        return (taggedStories + moreStories).first(5) if taggedStories
        return moreStories
      end

      def taggedStories tags
        tagsArray = tags.split(',')
        Story.where("tags && ARRAY[?]::varchar[]", tagsArray).order(published_at: :desc).limit(stories_limit)
      end

      def untaggedStories
        Story.order(published_at: :desc).limit(stories_limit)
      end

      def stories_limit
        params[:limit] || 5
      end
    end
  end
end
