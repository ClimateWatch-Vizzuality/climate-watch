module NdcSdg
  class Sector < ApplicationRecord
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::NdcTargetSector',
             dependent: :destroy
    has_many :ndc_targets,
             through: :ndc_target_sectors
    has_many :targets,
             through: :ndc_targets
  end
end
