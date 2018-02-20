FactoryBot.define do
  factory :historical_emissions_sector,
          class: 'HistoricalEmissions::Sector' do
    association :data_source,
                factory: :historical_emissions_data_source
    name 'MyText'
  end
end
