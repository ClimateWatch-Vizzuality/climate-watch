class CreateCaitIndcLocationIndicatorValues < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_location_indicator_values do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.references :indicator, foreign_key: {to_table: :cait_indc_indicators, on_delete: :cascade}
      t.references :indicator_value, foreign_key: {to_table: :cait_indc_indicator_values, on_delete: :cascade}
      t.jsonb :custom_value, null: false, default: nil
    end
  end
end
