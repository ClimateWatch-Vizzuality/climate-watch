class NdcSdgTarget < ApplicationRecord
  belongs_to :ndc
  belongs_to :sdg_target
  has_many :ndc_sdg_target_sectors, dependent: :destroy
end
