module NdcSdg
  class NdcTarget < ApplicationRecord
    belongs_to :ndc
    belongs_to :target, class_name: 'NdcSdg::Target'
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::NdcTargetSector',
             dependent: :destroy
  end
end
