FactoryBot.define do
  factory :story do
    sequence :title { |n| "#{n} Stories about climate and love" }
    link { 'http://my.dreams.com' }
    background_image_url { 'http://pictures.of.me/1.png' }
    published_at { Time.now }
  end
end
