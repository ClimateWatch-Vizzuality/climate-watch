RSpec.shared_context 'Net Zero indicators' do
  include_context 'Net Zero sources'
  include_context 'Net Zero categories'

  let!(:nz_ghg) {
    i = FactoryBot.create(
      :indc_indicator,
      source: net_zero,
      slug: 'nz_ghg',
      name: 'Coverage of GHGs'
    )
    i.categories = [overview, net_zero_category]
    i
  }

  let!(:nz_status) {
    i = FactoryBot.create(
      :indc_indicator,
      source: net_zero,
      slug: 'nz_status',
      name: 'Net Zero Target Status'
    )
    i.categories = [overview, net_zero_category]
    i
  }
end
