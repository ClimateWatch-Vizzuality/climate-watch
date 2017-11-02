class CreateNewIndcValues < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_values do |t|
      t.references :indicator, foreign_key: {
        to_table: :indc_indicators,
        on_delete: :cascade
      }, null: false
      t.references :location, foreign_key: {
        to_table: :locations,
        on_delete: :cascade
      }, null: false
      t.references :sector, foreign_key: {
        to_table: :indc_sectors,
        on_delete: :cascade
      }
      t.references :label, foreign_key: {
        to_table: :indc_labels,
        on_delete: :cascade
      }
      t.text :value, null: false
      t.timestamps
    end
  end
end
