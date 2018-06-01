RSpec.shared_context 'historical emissions gwps' do
  let(:gwp_AR2) { FactoryBot.create(:historical_emissions_gwp, name: 'AR2') }
  let(:gwp_AR4) { FactoryBot.create(:historical_emissions_gwp, name: 'AR4') }
end
