FactoryBot.define do
  factory :agriculture_profile_meat_trade, class: 'AgricultureProfile::MeatTrade' do
    association :location, factory: :location
    sequence(:year) { |n| 1960 + n }
    sequence(:trade_import_1) { |n| 10000 + n }
    sequence(:trade_import_2) { |n| 20000 + n }
    sequence(:trade_import_3) { |n| 30000 + n }
    sequence(:trade_import_4) { |n| 40000 + n }
    sequence(:trade_import_5) { |n| 50000 + n }
    sequence(:trade_import_6) { |n| 60000 + n }
    sequence(:trade_import_7) { |n| 70000 + n }
    sequence(:trade_import_8) { |n| 80000 + n }
    sequence(:trade_export_1) { |n| 90000 + n }
    sequence(:trade_export_2) { |n| 100000 + n }
    sequence(:trade_export_3) { |n| 110000 + n }
    sequence(:trade_export_4) { |n| 120000 + n }
    sequence(:trade_export_5) { |n| 130000 + n }
    sequence(:trade_export_6) { |n| 140000 + n }
    sequence(:trade_export_7) { |n| 150000 + n }
    sequence(:trade_export_8) { |n| 160000 + n }
  end
end