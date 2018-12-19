FactoryBot.define do
  factory :agriculture_profile_emission_subcategory,
          class: 'AgricultureProfile::EmissionSubcategory' do
    association :emission_category, factory: :agriculture_profile_emission_category
    sequence(:indicator_name) { |n| 'indicator_name-' + ('AA'..'ZZ').to_a[n] }
    sequence(:name) { |n| 'name-' + ('AA'..'ZZ').to_a[n] }
    sequence(:short_name) { |n| 'short_name-' + ('AA'..'ZZ').to_a[n] }
  end
end