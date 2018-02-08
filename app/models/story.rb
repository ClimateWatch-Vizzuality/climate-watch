class Story < ApplicationRecord
  def self.stories_filter(tags, limit = 5)
    tagged_stories = tagged_stories(tags, limit)
    return tagged_stories if tagged_stories.length >= 5
    more_stories = untagged_stories(limit)
    return (tagged_stories + more_stories).first(5) if tagged_stories
    more_stories
  end

  def self.tagged_stories(tags, limit)
    tags_array = tags.split(',')
    Story.where('tags && ARRAY[?]::varchar[]', tags_array).
      order(published_at: :desc).
      limit(limit)
  end

  def self.untagged_stories(limit)
    Story.order(published_at: :desc).limit(limit)
  end
end
