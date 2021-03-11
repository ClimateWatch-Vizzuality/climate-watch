# == Schema Information
#
# Table name: users
#
#  id           :bigint           not null, primary key
#  ct_id        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  organization :string
#  first_name   :string
#  last_name    :string
#  country      :string
#  sector       :string
#  data_usage   :text
#  tester       :boolean
#
FactoryBot.define do
  factory :user, class: 'MyCw::User' do
    ct_id { ENV['DEV_USER_ID'] }
  end
end
