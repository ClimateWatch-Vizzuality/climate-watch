class CreateCaitIndcCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_categories do |t|
      t.text :name, null: false
      t.text :slug, null: false
    end
  end
end
