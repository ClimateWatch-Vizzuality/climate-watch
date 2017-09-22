class RemoveCaitIndcUnusedTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :cait_indc_location_data
    drop_table :cait_indc_indicator_types
  end
end
