class CreateIndcSearchableValues < ActiveRecord::Migration[5.2]
  def change
    create_view :indc_searchable_values, materialized: true
    add_index :indc_searchable_values, :iso_code3
    add_index :indc_searchable_values, :source_id
    add_index :indc_searchable_values, :indicator_id
    add_index :indc_searchable_values, :sector_id
    add_index :indc_searchable_values, :global_categories_ids
    add_index :indc_searchable_values, :overview_categories_ids
  end
end
