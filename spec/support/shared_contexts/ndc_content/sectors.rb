RSpec.shared_context 'NDC sectors' do
  let!(:transport) {
    FactoryBot.create(
      :indc_sector,
      parent: nil,
      name: 'Transport'
    )
  }

  let!(:vehicle_fleet) {
    FactoryBot.create(
      :indc_sector,
      parent: transport,
      name: 'Vehicle Fleet'
    )
  }

  let!(:aviation) {
    FactoryBot.create(
      :indc_sector,
      parent: transport,
      name: 'Aviation'
    )
  }
end
