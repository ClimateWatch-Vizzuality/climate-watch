class ChangeSectorReferenceInNdcSdgTargetSectors < ActiveRecord::Migration[5.1]
  def change
    remove_reference :ndc_sdg_target_sectors, :sector
    add_reference :ndc_sdg_target_sectors, :sdg_sector, foreign_key: true, index: true
  end
end
