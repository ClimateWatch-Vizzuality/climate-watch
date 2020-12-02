RSpec.shared_context 'Net Zero values' do
  include_context 'locations'
  include_context 'Net Zero indicators'
  include_context 'Net Zero labels'

  let!(:value_1) {
    FactoryBot.create(
      :indc_value,
      indicator: nz_ghg,
      label: ghg_coverage_label,
      location: spain,
      value: 'Unclear or Undecided'
    )
  }

  let!(:value_2) {
    FactoryBot.create(
      :indc_value,
      indicator: nz_status,
      location: spain,
      value: 'In Policy Document'
    )
  }

  let!(:value_3) {
    FactoryBot.create(
      :indc_value,
      indicator: nz_status,
      location: uk,
      value: 'In Policy Document'
    )
  }
end
