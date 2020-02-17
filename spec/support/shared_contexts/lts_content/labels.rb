RSpec.shared_context 'LTS labels' do
  include_context 'LTS indicators'

  let!(:baseline_scenario_target) {
    FactoryBot.create(
      :indc_label,
      indicator: ghg_target_type,
      value: 'Baseline scenario target'
    )
  }
end
