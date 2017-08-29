class CreateCaitIndcIndicatorLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_indicator_labels do |t|
      t.references :indicator, foreign_key: {to_table: :cait_indc_indicators, on_delete: :cascade}
      t.text :name, null: false
      t.text :color
      t.timestamps
    end
  end
end
