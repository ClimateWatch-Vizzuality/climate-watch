class CreateNdcSdgTargetSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :ndc_sdg_target_sectors do |t|
      t.references :ndc_sdg_target, foreign_key: true, index: true
      t.references :sector, foreign_key: true, index: true

      t.timestamps
    end
  end
end
