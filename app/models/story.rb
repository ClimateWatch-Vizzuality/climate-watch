class Story < ApplicationRecord
  def self.stories_filter(tags, limit)
    tags_array = tags.try(:split, ',')
    limit = limit.try(:to_i) || 5

    pinned_stories = pinned_stories(1)
    tagged_stories = tagged_stories(tags_array, limit)
    main_stories = (pinned_stories + tagged_stories).uniq
    return main_stories if main_stories.length >= limit

    more_stories = not_tagged_by(tags_array, limit)
    return (main_stories + more_stories).uniq.first(limit) if main_stories
    more_stories
  end

  def self.pinned_stories(limit)
    Story.where('tags && Array[?]::varchar[]', ['climatewatch-pinned']).
      order(published_at: :desc).
      limit(limit)
  end

  def self.tagged_stories(tags, limit)
    Story.where('tags && ARRAY[?]::varchar[]', tags).
      order(published_at: :desc).
      limit(limit)
  end

  def self.not_tagged_by(tags, limit)
    Story.where('(NOT tags && ARRAY[?]::varchar[]) OR tags IS NULL', tags).
      order(published_at: :desc).
      limit(limit)
  end
end
