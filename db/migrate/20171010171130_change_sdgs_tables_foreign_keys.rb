class ChangeSdgsTablesForeignKeys < ActiveRecord::Migration[5.1]
  def change
    add_cascade_to_foreign_key :ndc_sdg_ndc_targets, :ndcs, :ndc_id
    add_cascade_to_foreign_key :ndc_sdg_ndc_targets, :ndc_sdg_targets, :target_id
    add_cascade_to_foreign_key :ndc_sdg_ndc_target_sectors, :ndc_sdg_ndc_targets, :ndc_target_id
    add_cascade_to_foreign_key :ndc_sdg_ndc_target_sectors, :ndc_sdg_sectors, :sector_id
  end

  def add_cascade_to_foreign_key from, to, column_name
    reversible do |dir|
      dir.up do
        remove_foreign_key from, to
        add_foreign_key from, to, column: column_name, on_delete: :cascade
      end

      dir.down do
        remove_foreign_key from, to
        add_foreign_key from, to, column: column_name
      end
    end
  end
end
