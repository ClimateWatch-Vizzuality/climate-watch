# == Schema Information
#
# Table name: ndc_sdg_ndc_target_sectors
#
#  id            :bigint           not null, primary key
#  ndc_target_id :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  sector_id     :bigint
#
FactoryBot.define do
  factory :ndc_sdg_ndc_target_sector, class: 'NdcSdg::NdcTargetSector' do
    association :ndc_target, factory: :ndc_sdg_ndc_target
    association :sector, factory: :ndc_sdg_sector
  end
end
