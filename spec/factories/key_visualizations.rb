# == Schema Information
#
# Table name: key_visualizations
#
#  id                 :bigint           not null, primary key
#  title              :string           not null
#  description        :text             not null
#  topic              :string           not null
#  embed_code         :text
#  image_download_url :text
#  data_download_url  :text
#  blog_link          :text
#  order              :integer          not null
#  geographies        :string           default([]), is an Array
#  tags               :string           default([]), is an Array
#  created_date       :date             not null
#  last_updated_date  :date             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  preview_image_url  :text
#  data_sources       :string           default([]), is an Array
#
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
    data_sources { %w(source1 source2) }

    last_updated_date { 20.days.ago }
    created_date { 30.days.ago }

    sequence(:order)
  end
end
