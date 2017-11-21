FactoryGirl.define do
  factory :vizualization, class: 'MyCw::Vizualization' do
    user
    title 'Title'
    description 'Description'
    json_body "{'body': 'body'}".to_json
  end
end