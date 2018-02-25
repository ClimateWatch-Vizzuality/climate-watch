FactoryBot.define do
  factory :user_story, class: 'MyCw::UserStory' do
    user
    title 'Title'
    body  "{'body': 'body'}".to_json
    add_attribute(:public) { false }
  end
end
