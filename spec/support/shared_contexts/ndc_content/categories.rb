RSpec.shared_context 'NDC categories' do
  let!(:overview) {
    FactoryBot.create(
      :indc_category,
      parent: nil,
      slug: 'overview',
      name: 'Overview'
    )
  }

  let!(:ndc) {
    FactoryBot.create(
      :indc_category,
      parent: overview,
      slug: 'ndc',
      name: 'NDC'
    )
  }

  let!(:sectoral_information) {
    FactoryBot.create(
      :indc_category,
      parent: nil,
      slug: 'sectoral_information',
      name: 'Sectoral Information'
    )
  }

  let!(:sectoral_plans) {
    FactoryBot.create(
      :indc_category,
      parent: sectoral_information,
      slug: 'sectoral_plans',
      name: 'Sectoral Mitigation Plans'
    )
  }

  let!(:sectoral_targets) {
    FactoryBot.create(
      :indc_category,
      parent: sectoral_information,
      slug: 'sectoral_targets',
      name: 'Sectoral Mitigation Targets'
    )
  }
end
