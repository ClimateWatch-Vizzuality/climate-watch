class CreateHistoricalEmissionsSectorSubsectors < ActiveRecord::Migration[5.2]
  def change
    create_table :historical_emissions_sector_subsectors do |t|
      t.references :sector, index: true, foreign_key: {
                     to_table: :historical_emissions_sectors,
                     on_delete: :cascade
                   }
      t.references :subsector, index: true, foreign_key: {
                     to_table: :historical_emissions_sectors,
                     on_delete: :cascade
                   }

      t.timestamps
    end
  end
end
