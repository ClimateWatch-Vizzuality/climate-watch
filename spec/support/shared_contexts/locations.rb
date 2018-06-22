RSpec.shared_context 'locations' do
  let(:spain) {
    FactoryBot.create(
      :location, iso_code3: 'ESP', wri_standard_name: 'Spain'
    )
  }
  let(:uk) {
    FactoryBot.create(
      :location, iso_code3: 'GBR', wri_standard_name: 'United Kingdom'
    )
  }
end
