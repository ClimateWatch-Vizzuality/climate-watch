class AddLocationIdToNdcSdgNdcTargets < ActiveRecord::Migration[5.1]
  def change
    add_reference :ndc_sdg_ndc_targets, :location, foreign_key: true
  end
end
