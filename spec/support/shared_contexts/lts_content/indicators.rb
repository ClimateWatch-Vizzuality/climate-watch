RSpec.shared_context 'LTS indicators' do
  include_context 'LTS sources'
  include_context 'LTS categories'

  let!(:ghg_target_type) {
    i = FactoryBot.create(
      :indc_indicator,
      source: lts,
      slug: 'ghg_target_type',
      name: 'GHG target type'
    )
    i.categories = [overview, lts_category]
    i
  }

  let!(:sectoral_plans_on) {
    i = FactoryBot.create(
      :indc_indicator,
      source: lts,
      slug: 'M_SecGen3',
      name: 'Sectoral plans on'
    )
    i.categories = [sectoral_information, sectoral_plans]
    i
  }

  let!(:sectoral_targets_on) {
    i = FactoryBot.create(
      :indc_indicator,
      source: lts,
      slug: 'M_SecTar1',
      name: 'Sectoral targets on'
    )
    i.categories = [sectoral_information, sectoral_targets]
    i
  }
end
