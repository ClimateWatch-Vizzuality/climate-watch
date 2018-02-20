FactoryBot.define do
  factory :ndc_sdg_ndc_target_sector, class: 'NdcSdg::NdcTargetSector' do
    association :ndc_target, factory: :ndc_sdg_ndc_target
    association :sector, factory: :ndc_sdg_sector
  end
end
