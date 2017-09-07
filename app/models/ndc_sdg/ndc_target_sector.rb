module NdcSdg
  class NdcTargetSector < ApplicationRecord
    belongs_to :ndc_target, class_name: 'NdcSdg::NdcTarget'
    belongs_to :sector, class_name: 'NdcSdg::Sector'
  end
end
