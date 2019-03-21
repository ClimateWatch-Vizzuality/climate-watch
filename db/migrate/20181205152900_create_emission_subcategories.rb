class CreateEmissionSubcategories < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_emission_subcategories do |t|
      t.string :name
      t.string :short_name
      t.string :indicator_name

      t.timestamps

      t.references :emission_category,
                   index: true,
                   foreign_key: { to_table: :agriculture_profile_emission_categories},
                   index: { name: 'index_emission_subcategories_on_emission_category_id' }
    end
  end
end
