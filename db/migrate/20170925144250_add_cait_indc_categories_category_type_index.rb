class AddCaitIndcCategoriesCategoryTypeIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :cait_indc_categories, :category_type
  end
end
