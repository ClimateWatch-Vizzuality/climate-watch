RSpec.shared_context 'NDC values' do
  include_context 'locations'
  include_context 'NDC indicators'
  include_context 'NDC labels'
  include_context 'NDC sectors'

  let!(:value_1) {
    FactoryBot.create(
      :indc_value,
      indicator: ghg_target_type,
      sector: aviation,
      label: baseline_scenario_target,
      location: uk,
      value: 'Baseline scenario target'
    )
  }

  let!(:value_2) {
    FactoryBot.create(
      :indc_value,
      indicator: sectoral_plans_on,
      sector: vehicle_fleet,
      location: spain,
      value: 'Increase share of electric vehicles'
    )
  }

  let!(:value_3) {
    FactoryBot.create(
      :indc_value,
      indicator: sectoral_targets_on,
      sector: vehicle_fleet,
      location: spain,
      value: '-30% in fuel consumption in 2025'
    )
  }
end
