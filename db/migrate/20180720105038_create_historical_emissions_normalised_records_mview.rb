class CreateHistoricalEmissionsNormalisedRecordsMview < ActiveRecord::Migration[5.1]
  def change
    create_view :historical_emissions_normalised_records, materialized: true
    add_index :historical_emissions_normalised_records, [:data_source_id]
    add_index :historical_emissions_normalised_records, [:gwp_id]
    add_index :historical_emissions_normalised_records, [:location_id]
    add_index :historical_emissions_normalised_records, [:sector_id]
    add_index :historical_emissions_normalised_records, [:gas_id]
    add_index :historical_emissions_normalised_records, [:year]
    add_index :historical_emissions_normalised_records, [:id, :year], unique: true
  end
end
