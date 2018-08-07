class CreateHistoricalEmissionsSearchableRecords < ActiveRecord::Migration[5.1]
  def up
    execute 'REFRESH MATERIALIZED VIEW historical_emissions_normalised_records'
    create_view :historical_emissions_searchable_records, materialized: true
    add_index :historical_emissions_searchable_records, [:data_source_id]
    add_index :historical_emissions_searchable_records, [:gwp_id]
    add_index :historical_emissions_searchable_records, [:location_id]
    add_index :historical_emissions_searchable_records, [:sector_id]
    add_index :historical_emissions_searchable_records, [:gas_id]
    add_index :historical_emissions_searchable_records, [:id], unique: true
    execute 'CREATE INDEX index_searchable_emissions_path_ops ON historical_emissions_searchable_records USING GIN (emissions_dict jsonb_path_ops)'
  end

  def down
    drop_view :historical_emissions_searchable_records, materialized: true
  end
end
