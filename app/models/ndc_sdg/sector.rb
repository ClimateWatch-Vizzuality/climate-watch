module NdcSdg
  class Sector < ApplicationRecord
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::NdcTargetSector',
             dependent: :destroy
    has_many :ndc_targets,
             through: :ndc_target_sectors
    has_many :targets,
             through: :ndc_targets

    def self.ndc_ids(sector_id)
      Sector.includes(:ndc_targets).
        find_by!(id: sector_id).
        ndc_targets.
        map(&:ndc_id).
        uniq
    end
  end
end
