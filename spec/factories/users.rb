FactoryGirl.define do
  factory :user, class: 'MyCw::User' do
    sequence :ct_id { |n| n.to_s }
  end
end