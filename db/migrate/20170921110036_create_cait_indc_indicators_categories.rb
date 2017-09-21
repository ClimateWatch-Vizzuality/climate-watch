class CreateCaitIndcIndicatorsCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_indicators_categories do |t|
      t.references :indicator, foreign_key: {to_table: :cait_indc_indicators, on_delete: :cascade}
      t.references :category, foreign_key: {to_table: :cait_indc_categories, on_delete: :cascade}
    end

    add_index :cait_indc_indicators_categories, [:indicator_id, :category_id],
              unique: true, name: 'indicator_id_category_id_index'
  end
end
