class CreateCaitIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_indicators do |t|
      t.references :chart, foreign_key: {to_table: :cait_indc_charts, on_delete: :cascade}
      t.references :indicator_type, foreign_key: {to_table: :cait_indc_indicator_types, on_delete: :cascade}
      t.references :category, foreign_key: {to_table: :cait_indc_categories, on_delete: :cascade}
      t.text :name, null: false
      t.boolean :summary_list, null: false, default: false
      t.boolean :on_map, null: false, default: false
      t.boolean :omit_from_detailed_view, null: false, default: false
      t.boolean :show_in_dashboard, null: false, default: false
      t.timestamps
    end
  end
end
