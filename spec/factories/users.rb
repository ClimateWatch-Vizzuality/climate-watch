FactoryBot.define do
  factory :user, class: 'MyCw::User' do
    ct_id { ENV['DEV_USER_ID'] }
  end
end
