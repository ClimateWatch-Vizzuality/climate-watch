FactoryBot.define do
  factory :agriculture_profile_meat_consumption, class: 'AgricultureProfile::MeatConsumption' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:meat_consumption_1) { |n| 100_00.5 + n }
    sequence(:meat_consumption_2) { |n| 20_000.5 + n }
    sequence(:meat_consumption_3) { |n| 30_000.5 + n }
    sequence(:meat_consumption_4) { |n| 40_000.5 + n }
    sequence(:meat_consumption_per_capita_1) { |n| 50_000.5 + n }
    sequence(:meat_consumption_per_capita_2) { |n| 60_000.5 + n }
    sequence(:meat_consumption_per_capita_3) { |n| 70_000.5 + n }
    sequence(:meat_consumption_per_capita_4) { |n| 80_000.5 + n }
  end
end
