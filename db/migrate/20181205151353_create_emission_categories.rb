class CreateEmissionCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_emission_categories do |t|
      t.string :name, null: false
      t.string :unit, null: false

      t.timestamps
    end
  end
end
