class ImportStories
  require 'rss'
  require 'open-uri'

  def call(reset = false)
    cleanup if reset

    import_stories
  end

  private

  def cleanup
    Story.delete_all
  end

  # rubocop:disable AbcSize
  def import_stories
    existing = Story.count
    url = 'http://www.wri.org/blog/rss2.xml'
    rss = open(url)
    feed = RSS::Parser.parse(rss)
    link_sanitizer = Rails::Html::LinkSanitizer.new
    puts "Channel Title: #{feed.channel.title}"
    feed.items.each do |item|
      title = link_sanitizer.sanitize(item.title)
      published_at = item.pubDate
      story = Story.find_or_initialize_by(title: title,
                                          published_at: published_at)
      story.link = item.link
      story.background_image_url = item.enclosure ? item.enclosure.url : nil
      # 14062021 - WRI new feed returns only climatewatch-pinned tag
      story.tags = ['climatewatch-pinned']
      story.save
    end
    # rubocop:enable AbcSize
    puts "#{Story.count - existing} new stories"
  end
end
