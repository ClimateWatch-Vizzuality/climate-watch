class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.text :code, null: false
      t.text :pik
      t.text :cait
      t.text :ndcp_navigators
      t.text :wri_standard_name, null: false
      t.text :unfccc_group
      t.boolean :country_group, default: false

      t.timestamps
    end
  end
end
