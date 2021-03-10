# == Schema Information
#
# Table name: agriculture_profile_emission_categories
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  unit       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :agriculture_profile_emission_category,
          class: 'AgricultureProfile::EmissionCategory' do
    sequence(:name) { |n| 'name-' + ('AA'..'ZZ').to_a[n] }
    unit { 'My unit' }
  end
end
