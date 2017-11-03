class CreateNewIndcIndicatorsCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_indicators_categories do |t|
      t.references :indicator, foreign_key: {
        to_table: :indc_indicators,
        on_delete: :cascade
      }, null: false
      t.references :category, foreign_key: {
        to_table: :indc_categories,
        on_delete: :cascade
      }, null: false
      t.timestamps
    end

    add_index :indc_indicators_categories, [
      :indicator_id,
      :category_id
    ], unique: true, name: :indc_indicators_categories_uniq
  end
end
