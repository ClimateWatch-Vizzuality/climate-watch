RSpec.shared_context 'Net Zero categories' do
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

  let!(:net_zero_category) {
    FactoryBot.create(
      :indc_category,
      parent: overview,
      category_type: overview_type,
      slug: 'net_zero_category',
      name: 'Net Zero Category'
    )
  }
end
