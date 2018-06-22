RSpec.shared_context 'NDC labels' do
  include_context 'NDC indicators'

  let!(:baseline_scenario_target) {
    FactoryBot.create(
      :indc_label,
      indicator: ghg_target_type,
      value: 'Baseline scenario target'
    )
  }
end
