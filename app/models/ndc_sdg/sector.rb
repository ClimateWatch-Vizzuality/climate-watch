module NdcSdg
  class Sector < ApplicationRecord
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::Sector',
             dependent: :destroy
  end
end
