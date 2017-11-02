class CreateNewIndcCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_categories do |t|
      t.references :category_type, foreign_key: {
        to_table: :indc_category_types,
        on_delete: :cascade
      }, null: false
      t.references :parent, foreign_key: {
        to_table: :indc_categories,
        on_delete: :cascade
      }
      t.text :slug, null: false
      t.text :name, null: false
      t.timestamps
    end
    add_index :indc_categories, [:slug, :category_type_id], unique: true
  end
end
