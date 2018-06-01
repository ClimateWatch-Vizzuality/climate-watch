RSpec.shared_context 'NDC SDG linkages' do
  include_context 'locations'
  include_context 'NDC SDG ndcs'
  include_context 'NDC SDG targets'
  include_context 'NDC SDG sectors'

  let!(:ndc_spain_target_1) {
    FactoryBot.create(
      :ndc_sdg_ndc_target,
      ndc: ndc_spain,
      target: target_1_1
    )
  }

  let!(:ndc_spain_target_2) {
    FactoryBot.create(
      :ndc_sdg_ndc_target,
      ndc: ndc_spain,
      target: target_2_1
    )
  }

  let!(:ndc_uk_target_1) {
    FactoryBot.create(
      :ndc_sdg_ndc_target,
      ndc: ndc_uk,
      target: target_1_1
    )
  }

  let!(:ndc_spain_target1_sector1) {
    FactoryBot.create(
      :ndc_sdg_ndc_target_sector,
      ndc_target: ndc_spain_target_1,
      sector: sector_1
    )
  }

  let!(:ndc_uk_target1_sector1) {
    FactoryBot.create(
      :ndc_sdg_ndc_target_sector,
      ndc_target: ndc_uk_target_1,
      sector: sector_1
    )
  }
end
