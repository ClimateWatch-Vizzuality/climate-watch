class RemoveLocationIdFromNdcSdgNdcTargets < ActiveRecord::Migration[5.1]
  def change
    remove_reference :ndc_sdg_ndc_targets, :location
  end
end
