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
module NdcSdg
  class NdcTargetSector < ApplicationRecord
    belongs_to :ndc_target, class_name: 'NdcSdg::NdcTarget'
    belongs_to :sector, class_name: 'NdcSdg::Sector'
  end
end
