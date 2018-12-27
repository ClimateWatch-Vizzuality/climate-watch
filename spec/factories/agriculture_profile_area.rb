FactoryBot.define do
  factory :agriculture_profile_area, class: 'AgricultureProfile::Area' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:share_in_land_area_1) { |n| 10000 + n }
    sequence(:share_in_land_area_2) { |n| 20000 + n }
    sequence(:share_in_land_area_3) { |n| 30000 + n }
    sequence(:share_in_land_area_4) { |n| 40000 + n }
    sequence(:share_in_agricultural_area_1) { |n| 5000 + n }
    sequence(:share_in_agricultural_area_2) { |n| 6000 + n }
    sequence(:share_in_agricultural_area_3) { |n| 7000 + n }
  end
end