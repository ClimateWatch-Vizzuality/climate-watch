class CreateIndcMaterializedViewsIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :indc_indicators, :id
    add_index :indc_categories, :id
    add_index :indc_indicators_categories, :indicator_id
    add_index :indc_indicators_categories, :category_id
    add_index :indc_labels, :id
    add_index :indc_labels, :indicator_id
    add_index :indc_values, :indicator_id
    add_index :indc_values, :label_id
  end
end
