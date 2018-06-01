RSpec.shared_context 'historical emissions gases' do
  let(:gas_CO2) { FactoryBot.create(:historical_emissions_gas, name: 'CO2') }
  let(:gas_N2O) { FactoryBot.create(:historical_emissions_gas, name: 'N2O') }
end
