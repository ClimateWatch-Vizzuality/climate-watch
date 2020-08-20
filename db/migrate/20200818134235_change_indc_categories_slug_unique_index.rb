class ChangeIndcCategoriesSlugUniqueIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :indc_categories, [:slug, :category_type_id]
    add_index :indc_categories, [:slug, :category_type_id, :parent_id], name: 'index_indc_categories_on_slug_category_type_and_parent', unique: true
  end
end
