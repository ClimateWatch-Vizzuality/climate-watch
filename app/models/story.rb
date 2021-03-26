# == Schema Information
#
# Table name: stories
#
#  id                   :bigint           not null, primary key
#  title                :string
#  description          :text
#  published_at         :datetime
#  background_image_url :string
#  link                 :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  tags                 :string           default([]), is an Array
#
class Story < ApplicationRecord
  def self.stories_filter(tags, limit)
    tags_array = tags.try(:split, ',')
    limit = limit.try(:to_i) || 5

    pinned_stories = tagged_stories(['climatewatch-pinned'], 2)
    return pinned_stories if pinned_stories.length >= limit

    tagged_stories = tagged_stories(tags_array, limit)
    main_stories = (pinned_stories + tagged_stories).uniq.first(limit)
    return main_stories if main_stories.length >= limit

    more_stories = not_tagged_by(tags_array, limit)
    return (main_stories + more_stories).uniq.first(limit) if main_stories
    more_stories
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
