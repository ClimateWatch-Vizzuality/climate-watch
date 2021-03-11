# == Schema Information
#
# Table name: notifications
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  date        :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :notification do
    description { '<div> Some Lorem Ipsum dolor</div>' }
    date { 2.days.ago }
  end
end
