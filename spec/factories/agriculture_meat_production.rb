FactoryBot.define do
  factory :agriculture_profile_meat_production, class: 'AgricultureProfile::MeatProduction' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:production_agr_1) { |n| 10_000 + n }
    sequence(:production_agr_2) { |n| 20_000 + n }
    sequence(:production_agr_3) { |n| 30_000 + n }
    sequence(:production_agr_4) { |n| 40_000 + n }
    sequence(:production_agr_5) { |n| 50_000 + n }
    sequence(:production_agr_6) { |n| 60_000 + n }
    sequence(:production_agr_7) { |n| 70_000 + n }
    sequence(:production_agr_8) { |n| 80_000 + n }
    sequence(:production_agr_9) { |n| 90_000 + n }
    sequence(:production_agr_10) { |n| 100_000 + n }
  end
end
