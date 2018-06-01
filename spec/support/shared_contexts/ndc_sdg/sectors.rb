RSpec.shared_context 'NDC SDG sectors' do
  let!(:sector_1) {
    FactoryBot.create(
      :ndc_sdg_sector,
      name: 'Forest and land use'
    )
  }

  let!(:sector_2) {
    FactoryBot.create(
      :ndc_sdg_sector,
      name: 'Renewable Energy'
    )
  }
end
