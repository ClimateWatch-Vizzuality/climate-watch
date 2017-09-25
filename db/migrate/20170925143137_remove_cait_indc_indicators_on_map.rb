class RemoveCaitIndcIndicatorsOnMap < ActiveRecord::Migration[5.1]
  def change
    remove_column :cait_indc_indicators, :on_map
  end
end
