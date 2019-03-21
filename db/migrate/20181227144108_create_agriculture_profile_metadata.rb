class CreateAgricultureProfileMetadata < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_metadata do |t|
      t.string :short_name, null: false
      t.string :indicator, null: false
      t.string :category
      t.string :subcategory
      t.string :unit
    end
  end
end
