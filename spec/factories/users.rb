FactoryGirl.define do
  factory :user, class: 'MyCw::User' do
    sequence :ct_id, &:to_s
  end
end
