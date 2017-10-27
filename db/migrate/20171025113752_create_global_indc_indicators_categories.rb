class CreateGlobalIndcIndicatorsCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :global_indc_indicators_categories do |t|
      t.references :indicator, foreign_key: {to_table: :global_indc_indicators, on_delete: :cascade}
      t.references :category, foreign_key: {to_table: :global_indc_categories, on_delete: :cascade}
    end
  end
end
