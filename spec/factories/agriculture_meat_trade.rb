FactoryBot.define do
  factory :agriculture_profile_meat_trade, class: 'AgricultureProfile::MeatTrade' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:trade_import_1) { |n| 10_000 + n }
    sequence(:trade_import_2) { |n| 20_000 + n }
    sequence(:trade_import_3) { |n| 30_000 + n }
    sequence(:trade_import_4) { |n| 40_000 + n }
    sequence(:trade_import_5) { |n| 50_000 + n }
    sequence(:trade_import_6) { |n| 60_000 + n }
    sequence(:trade_import_7) { |n| 70_000 + n }
    sequence(:trade_import_8) { |n| 80_000 + n }
    sequence(:trade_export_1) { |n| 90_000 + n }
    sequence(:trade_export_2) { |n| 100_000 + n }
    sequence(:trade_export_3) { |n| 110_000 + n }
    sequence(:trade_export_4) { |n| 120_000 + n }
    sequence(:trade_export_5) { |n| 130_000 + n }
    sequence(:trade_export_6) { |n| 140_000 + n }
    sequence(:trade_export_7) { |n| 150_000 + n }
    sequence(:trade_export_8) { |n| 160_000 + n }
  end
end
