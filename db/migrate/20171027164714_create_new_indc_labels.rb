class CreateNewIndcLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_labels do |t|
      t.references :indicator, foreign_key: {
        to_table: :indc_indicators,
        on_delete: :cascade
      }, null: false
      t.text :value, null: false
      t.integer :index, null: false
      t.timestamps
    end
  end
end
