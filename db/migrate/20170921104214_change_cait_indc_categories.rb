class ChangeCaitIndcCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :cait_indc_categories, :category_type, :text
  end
end
