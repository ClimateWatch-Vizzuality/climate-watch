class CreateHistoricalEmissions < ActiveRecord::Migration[5.1]
  def change
    create_table :historical_emissions do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.references :data_source, foreign_key: {on_delete: :cascade}
      t.references :sector, foreign_key: {on_delete: :cascade}
      t.references :gas, foreign_key: {on_delete: :cascade}
      t.text :gwp
      t.jsonb :emissions
      t.timestamp
    end
  end
end
