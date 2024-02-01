RSpec.shared_context 'historical emissions sectors' do
  let(:sector_total) {
    FactoryBot.create(
      :historical_emissions_sector, name: 'Total including LULUCF'
    )
  }
  let(:sector_energy) {
    FactoryBot.create(
      :historical_emissions_sector, name: 'Energy', parent: sector_total
    )
  }
  let(:sector_agriculture) {
    FactoryBot.create(
      :historical_emissions_sector, name: 'Agriculture', parent: sector_total
    )
  }
end
