class CreateWbIndcCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_indc_categories do |t|
      t.text :name, null: false
      t.timestamps
    end
  end
end
