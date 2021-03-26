# == Schema Information
#
# Table name: indc_categories
#
#  id               :bigint           not null, primary key
#  category_type_id :bigint           not null
#  parent_id        :bigint
#  slug             :text             not null
#  name             :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  order            :integer
#
FactoryBot.define do
  factory :indc_category, class: 'Indc::Category' do
    name { 'MyName' }
    sequence(:slug) { |n| 'my-slug-' + ('AA'..'ZZ').to_a[n] }
    association :category_type, factory: :indc_category_type
  end
end
