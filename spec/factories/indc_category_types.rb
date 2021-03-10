# == Schema Information
#
# Table name: indc_category_types
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :indc_category_type, class: 'Indc::CategoryType' do
    sequence(:name) { |n| 'My Name ' + ('AA'..'ZZ').to_a[n] }
  end
end
