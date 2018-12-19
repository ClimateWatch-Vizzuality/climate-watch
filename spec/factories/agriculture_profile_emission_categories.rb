FactoryBot.define do
  factory :agriculture_profile_emission_category,
          class: 'AgricultureProfile::EmissionCategory' do
    sequence(:name) { |n| 'name-' + ('AA'..'ZZ').to_a[n] }
    unit { 'My unit' }
  end
end