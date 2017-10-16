class CreateWbIndcValues < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_indc_values do |t|
      t.references :indicator, foreign_key: {to_table: :wb_indc_indicators, on_delete: :cascade}
      t.references :location, foreign_key: {to_table: :locations, on_delete: :cascade}
      t.references :sector, foreign_key: {to_table: :wb_indc_sectors, on_delete: :cascade}
      t.text :value
      t.timestamps
    end
  end
end
