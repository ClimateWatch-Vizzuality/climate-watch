class CreateWbExtraCountryData < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_extra_country_data do |t|
      t.references :location, foreign_key: true
      t.integer :year
      t.string :gdp
      t.string :population
      t.timestamps
    end
  end
end
