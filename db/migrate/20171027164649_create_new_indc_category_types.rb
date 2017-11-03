class CreateNewIndcCategoryTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_category_types do |t|
      t.text :name, null: false
      t.timestamps
    end

    add_index :indc_category_types, :name, unique: true
  end
end
