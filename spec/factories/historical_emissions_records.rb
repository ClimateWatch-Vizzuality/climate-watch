FactoryGirl.define do
  factory :historical_emissions_record,
          class: 'HistoricalEmissions::Record' do
    location
    association :data_source,
                factory: :historical_emissions_data_source
    association :sector,
                factory: :historical_emissions_sector
    association :gas,
                factory: :historical_emissions_gas
  end
end
