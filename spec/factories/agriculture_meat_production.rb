FactoryBot.define do
  factory :agriculture_profile_meat_production, class: 'AgricultureProfile::MeatProduction' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:production_agr_1) { |n| 10000 + n }
    sequence(:production_agr_2) { |n| 20000 + n }
    sequence(:production_agr_3) { |n| 30000 + n }
    sequence(:production_agr_4) { |n| 40000 + n }
    sequence(:production_agr_5) { |n| 50000 + n }
    sequence(:production_agr_6) { |n| 60000 + n }
    sequence(:production_agr_7) { |n| 70000 + n }
    sequence(:production_agr_8) { |n| 80000 + n }
    sequence(:production_agr_9) { |n| 90000 + n }
    sequence(:production_agr_10) { |n| 100000 + n }
  end
end