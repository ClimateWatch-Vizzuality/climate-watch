FactoryBot.define do
  factory :agriculture_profile_area, class: 'AgricultureProfile::Area' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:share_in_land_area_1) { |n| 10_000 + n }
    sequence(:share_in_land_area_2) { |n| 20_000 + n }
    sequence(:share_in_land_area_3) { |n| 30_000 + n }
    sequence(:share_in_land_area_4) { |n| 40_000 + n }
    sequence(:share_in_agricultural_area_1) { |n| 5_000 + n }
    sequence(:share_in_agricultural_area_2) { |n| 6_000 + n }
    sequence(:share_in_agricultural_area_3) { |n| 7_000 + n }
  end
end
