RSpec.shared_context 'Net Zero labels' do
  include_context 'Net Zero indicators'

  let!(:ghg_coverage_label) {
    FactoryBot.create(
      :indc_label,
      indicator: nz_ghg,
      value: 'GHG Coverage Unclear or Undecided'
    )
  }
end
