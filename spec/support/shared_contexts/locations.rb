RSpec.shared_context 'locations' do
  let(:spain) {
    FactoryBot.create(
      :location,
      iso_code3: 'ESP',
      wri_standard_name: 'Spain',
      location_type: 'COUNTRY'
    )
  }
  let(:uk) {
    FactoryBot.create(
      :location,
      iso_code3: 'GBR',
      wri_standard_name: 'United Kingdom',
      location_type: 'COUNTRY'
    )
  }
  let!(:eu) {
    eu = FactoryBot.create(
      :location,
      iso_code3: 'EU',
      wri_standard_name: 'European Union',
      location_type: 'REGION'
    )
    eu.members = [spain, uk]
    eu
  }
end
