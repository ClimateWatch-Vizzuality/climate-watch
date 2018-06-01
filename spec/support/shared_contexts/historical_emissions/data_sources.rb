RSpec.shared_context 'historical emissions data sources' do
  let(:source_CAIT) {
    FactoryBot.create(:historical_emissions_data_source, name: 'CAIT')
  }
  let(:source_PIK) {
    FactoryBot.create(:historical_emissions_data_source, name: 'PIK')
  }
end
