FactoryBot.define do
  factory :key_visualization do
    title { 'title' }
    description { 'description' }
    topic { 'topic' }
    embed_code { 'embed code' }

    preview_image_url { 'https://example.com/preview-image.png' }
    image_download_url { 'https://example.com/image.png' }
    data_download_url { 'https://example.com/data.csv' }
    blog_link { 'https://example.com' }

    tags { %w(tag1 tag2) }
    geographies { %w(Poland UK Portugal Spain) }

    last_updated_date { 20.days.ago }
    created_date { 30.days.ago }

    sequence(:order)
  end
end
