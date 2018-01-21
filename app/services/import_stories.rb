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

  def import_stories
    existing = Story.count
    url = 'http://feeds.feedburner.com/WRI_News_and_Views.rss'
    rss = open(url)
    feed = RSS::Parser.parse(rss)
    puts "Channel Title: #{feed.channel.title}"
    feed.items.each do |item|
      title = item.title
      published_at = item.pubDate
      story = Story.find_or_initialize_by(title: title,
                                          published_at: published_at)

      story.description = item.description
      story.link = item.link
      story.image = item.enclosure
      story.tags = item.category
      story.save
    end
    puts "#{Story.count - existing} new stories"
  end
end
