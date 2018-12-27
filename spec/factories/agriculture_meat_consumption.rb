FactoryBot.define do
  factory :agriculture_profile_meat_consumption, class: 'AgricultureProfile::MeatConsumption' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:meat_consumption_1) { |n| 10000.5 + n }
    sequence(:meat_consumption_2) { |n| 20000.5 + n }
    sequence(:meat_consumption_3) { |n| 30000.5 + n }
    sequence(:meat_consumption_4) { |n| 40000.5 + n }
    sequence(:meat_consumption_per_capita_1) { |n| 50000.5 + n }
    sequence(:meat_consumption_per_capita_2) { |n| 60000.5 + n }
    sequence(:meat_consumption_per_capita_3) { |n| 70000.5 + n }
    sequence(:meat_consumption_per_capita_4) { |n| 80000.5 + n }
  end
end