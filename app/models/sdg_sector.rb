class SdgSector < ApplicationRecord
  has_many :ndc_sdg_target_sectors, dependent: :destroy
end
