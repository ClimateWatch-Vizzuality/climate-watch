RSpec.shared_context 'LTS sources' do
  let!(:lts) {
    FactoryBot.create(
      :indc_source,
      name: 'LTS'
    )
  }
end
