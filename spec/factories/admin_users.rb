# == Schema Information
#
# Table name: admin_users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role                   :string
#
FactoryBot.define do
  factory :admin_user do
    sequence(:email) { |n| "admin#{n}#{rand(99_999)}@example.com" }
    role { 'superuser' }
    password { 'secret' }
  end
end
