RSpec.shared_context 'historical emissions data sources' do
  let(:source_CW) {
    FactoryBot.create(
      :historical_emissions_data_source,
      name: 'Climate Watch',
      display_name: 'Climate Watch',
      metadata_dataset: 'historical_emissions_climate_watch'
    )
  }
  let(:source_PIK) {
    FactoryBot.create(
      :historical_emissions_data_source,
      name: 'PIK',
      display_name: 'PIK',
      metadata_dataset: 'historical_emissions_PIK'
    )
  }
end
