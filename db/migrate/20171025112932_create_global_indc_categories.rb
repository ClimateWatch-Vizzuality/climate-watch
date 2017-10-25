class CreateGlobalIndcCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :global_indc_categories do |t|
      t.text :name
      t.text :slug
      t.references :parent, foreign_key: {to_table: :global_indc_categories, on_delete: :cascade}
      t.timestamps
    end
  end
end
