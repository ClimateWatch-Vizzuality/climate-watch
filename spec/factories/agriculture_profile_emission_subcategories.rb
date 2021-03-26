# == Schema Information
#
# Table name: agriculture_profile_emission_subcategories
#
#  id                   :bigint           not null, primary key
#  name                 :string
#  short_name           :string
#  indicator_name       :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  emission_category_id :bigint
#
FactoryBot.define do
  factory :agriculture_profile_emission_subcategory,
          class: 'AgricultureProfile::EmissionSubcategory' do
    association :emission_category, factory: :agriculture_profile_emission_category
    sequence(:indicator_name) { |n| 'indicator_name-' + ('AA'..'ZZ').to_a[n] }
    sequence(:name) { |n| 'name-' + ('AA'..'ZZ').to_a[n] }
    sequence(:short_name) { |n| 'short_name-' + ('AA'..'ZZ').to_a[n] }
  end
end
