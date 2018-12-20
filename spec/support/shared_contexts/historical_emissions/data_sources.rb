RSpec.shared_context 'historical emissions data sources' do
  let(:source_CAIT) {
    FactoryBot.create(
      :historical_emissions_data_source,
      name: 'CAIT',
      display_name: 'CAIT',
      metadata_dataset: 'historical_emissions_CAIT'
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
