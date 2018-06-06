RSpec.shared_context 'NDC sources' do
  let!(:wb) {
    FactoryBot.create(
      :indc_source,
      name: 'WB'
    )
  }
end
