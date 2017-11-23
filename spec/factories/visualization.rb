FactoryGirl.define do
  factory :visualization, class: 'MyCw::Visualization' do
    user
    title 'Title'
    description 'Description'
    json_body "{'body': 'body'}".to_json
  end
end
