class PrefixTablesWithNdcSdg < ActiveRecord::Migration[5.1]
  def change
    rename_table :sdg_sectors, :ndc_sdg_sectors
    rename_column :ndc_sdg_target_sectors, :sdg_sector_id, :sector_id
    rename_table :ndc_sdg_targets, :ndc_sdg_ndc_targets
    rename_column :ndc_sdg_target_sectors, :ndc_sdg_target_id, :ndc_target_id
    rename_table :ndc_sdg_target_sectors, :ndc_sdg_ndc_target_sectors
    rename_table :sdgs, :ndc_sdg_goals
    rename_column :sdg_targets, :sdg_id, :goal_id
    rename_table :sdg_targets, :ndc_sdg_targets
    rename_column :ndc_sdg_ndc_targets, :sdg_target_id, :target_id
  end
end
