class CreateHistoricalEmissionsGwps < ActiveRecord::Migration[5.1]
  def change
    create_table :historical_emissions_gwps do |t|
      t.text :name
      t.timestamps
    end
  end
end
