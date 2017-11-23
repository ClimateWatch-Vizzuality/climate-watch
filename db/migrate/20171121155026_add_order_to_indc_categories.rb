class AddOrderToIndcCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :indc_categories, :order, :integer
  end
end
