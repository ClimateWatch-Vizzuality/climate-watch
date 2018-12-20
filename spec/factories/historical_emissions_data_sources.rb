FactoryBot.define do
  factory :historical_emissions_data_source,
          class: 'HistoricalEmissions::DataSource' do
    name { 'MyText' }
    display_name { 'MyText' }
    metadata_dataset { 'historical_emissions_MyText' }
  end
end
