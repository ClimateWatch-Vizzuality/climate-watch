module NdcSdg
  class NdcTarget < ApplicationRecord
    belongs_to :ndc
    belongs_to :target, class_name: 'NdcSdg::Target'
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::NdcTargetSector',
             dependent: :destroy
    has_many :sectors,
             class_name: 'NdcSdg::Sector',
             through: :ndc_target_sectors
  end
end
