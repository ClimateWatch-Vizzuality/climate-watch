class CreateCaitIndcValues < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_values do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.references :indicator, foreign_key: {to_table: :cait_indc_indicators, on_delete: :cascade}
      t.references :indicator_label, foreign_key: {to_table: :cait_indc_indicator_labels, on_delete: :cascade}
      t.text :value, null: false, default: nil
    end
  end
end
