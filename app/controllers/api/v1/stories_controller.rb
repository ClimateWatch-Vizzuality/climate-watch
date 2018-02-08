module Api
  module V1
    class StoriesController < ApiController
      def index
        stories = stories_filter(params[:tags])
        render json: stories, each_serializer: Api::V1::StorySerializer
      end

      private

      def stories_filter(tags)
        tagged_stories = tagged_stories(tags)
        return tagged_stories if tagged_stories.length >= 5
        more_stories = untagged_stories
        return (tagged_stories + more_stories).first(5) if tagged_stories
        more_stories
      end

      def tagged_stories(tags)
        tags_array = tags.split(',')
        # rubocop:disable LineLength
        Story.where('tags && ARRAY[?]::varchar[]', tags_array).order(published_at: :desc).limit(stories_limit)
        # rubocop:enable LineLength
      end

      def untagged_stories
        Story.order(published_at: :desc).limit(stories_limit)
      end

      def stories_limit
        params[:limit] || 5
      end
    end
  end
end
