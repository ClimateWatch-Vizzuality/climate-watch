class ChangeNdcSdgNdcTargets < ActiveRecord::Migration[5.1]
  def change
    add_column :ndc_sdg_ndc_targets, :starts_at, :integer
    add_column :ndc_sdg_ndc_targets, :ends_at, :integer
  end
end
