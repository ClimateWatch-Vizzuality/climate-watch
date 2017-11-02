class CreateSocioeconomicIndicators < ActiveRecord::Migration[5.1]
  def change
    create_table :socioeconomic_indicators do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.integer :year, limit: 2, null: false
      t.bigint :gdp
      t.integer :gdp_rank, limit: 2
      t.float :gdp_per_capita
      t.integer :gdp_per_capita_rank
      t.bigint :population
      t.integer :population_rank, limit: 2
      t.float :population_growth
      t.integer :population_growth_rank, limit: 2
      t.timestamps
    end
    add_index :socioeconomic_indicators, [:location_id, :year], unique: true
  end
end
