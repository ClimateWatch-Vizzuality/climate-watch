# == Schema Information
#
# Table name: user_stories
#
#  id         :bigint           not null, primary key
#  title      :string
#  body       :jsonb
#  public     :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
FactoryBot.define do
  factory :user_story, class: 'MyCw::UserStory' do
    user
    title { 'Title' }
    body  { "{'body': 'body'}".to_json }
    add_attribute(:public) { false }
  end
end
