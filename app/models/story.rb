class Story < ApplicationRecord
  def self.stories_filter(tags, limit = 5)
    tags_array = tags.split(',')
    tagged_stories = tagged_stories(tags_array, limit)
    return tagged_stories if tagged_stories.length >= 5
    more_stories = not_tagged_by(tags_array, limit)
    return (tagged_stories + more_stories).first(5) if tagged_stories
    more_stories
  end

  def self.tagged_stories(tags, limit)
    Story.where('tags && ARRAY[?]::varchar[]', tags).
      order(published_at: :desc).
      limit(limit)
  end

  def self.not_tagged_by(tags, limit)
    Story.where('NOT tags && ARRAY[?]::varchar[] OR tags IS NULL', tags).
      order(published_at: :desc).
      limit(limit)
  end
end
