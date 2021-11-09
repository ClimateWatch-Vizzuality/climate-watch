class CreateCountryProfileValues < ActiveRecord::Migration[5.2]
  def change
    create_table :country_profile_values do |t|
      t.references :location, null: false, foreign_key: {on_delete: :cascade}
      t.references :indicator, foreign_key: {
        to_table: :country_profile_indicators, on_delete: :cascade
      }
      t.string :category
      t.string :value, null: false
      t.integer :year
    end
  end
end
