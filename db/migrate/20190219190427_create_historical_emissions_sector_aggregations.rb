class CreateHistoricalEmissionsSectorAggregations < ActiveRecord::Migration[5.2]
  def change
    create_table :historical_emissions_sector_aggregations do |t|
      t.references :sector, index: true, foreign_key: {
                     to_table: :historical_emissions_sectors,
                     on_delete: :cascade
                   }
      t.references :aggregated_sector,
                   index: { name: 'index_historical_emissions_sector_aggregations_on_agg_sector_id' },
                   foreign_key: {
                     to_table: :historical_emissions_sectors,
                     on_delete: :cascade
                   }

      t.timestamps
    end
  end
end
