RSpec.shared_context 'historical emissions sectors' do
  let(:sector_energy) {
    FactoryBot.create(:historical_emissions_sector, name: 'Energy')
  }
  let(:sector_agriculture) {
    FactoryBot.create(:historical_emissions_sector, name: 'Agriculture')
  }
end
