RSpec.shared_context 'LTS categories' do
  let(:global_type) {
    FactoryBot.create(:indc_category_type, name: ::Indc::CategoryType::GLOBAL)
  }
  let(:overview_type) {
    FactoryBot.create(
      :indc_category_type, name: ::Indc::CategoryType::OVERVIEW
    )
  }
  let!(:overview) {
    FactoryBot.create(
      :indc_category,
      parent: nil,
      category_type: global_type,
      slug: 'overview',
      name: 'Overview'
    )
  }

  let!(:lts_category) {
    FactoryBot.create(
      :indc_category,
      parent: overview,
      category_type: overview_type,
      slug: 'lts_category',
      name: 'LTS Category'
    )
  }

  let!(:sectoral_information) {
    FactoryBot.create(
      :indc_category,
      parent: nil,
      category_type: global_type,
      slug: 'sectoral_information',
      name: 'Sectoral Information'
    )
  }

  let!(:sectoral_plans) {
    FactoryBot.create(
      :indc_category,
      parent: sectoral_information,
      category_type: overview_type,
      slug: 'sectoral_plans',
      name: 'Sectoral Mitigation Plans'
    )
  }

  let!(:sectoral_targets) {
    FactoryBot.create(
      :indc_category,
      parent: sectoral_information,
      category_type: overview_type,
      slug: 'sectoral_targets',
      name: 'Sectoral Mitigation Targets'
    )
  }
end
