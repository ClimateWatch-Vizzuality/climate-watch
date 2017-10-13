class CreateWbIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_indc_indicators do |t|
      t.references :indicator_type, foreign_key: {to_table: :wb_indc_indicator_types, on_delete: :cascade}
      t.text :code, null: false
      t.text :name, null: false
      t.text :description
      t.timestamps
    end
  end
end
