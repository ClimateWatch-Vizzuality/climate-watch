class UpdateHistoricalEmissionsViewsToRemoveGwp < ActiveRecord::Migration[5.2]
  def up
    drop_view :historical_emissions_searchable_records, materialized: true
    drop_view :historical_emissions_records_emissions, materialized: true
    drop_view :historical_emissions_normalised_records, materialized: true

    create_view :historical_emissions_normalised_records, materialized: true, version: 2
    create_view :historical_emissions_records_emissions, materialized: true, version: 1
    add_index :historical_emissions_records_emissions, [:id], unique: true
    create_view :historical_emissions_searchable_records, materialized: true, version: 2
    add_index :historical_emissions_searchable_records, [:data_source_id]
    add_index :historical_emissions_searchable_records, [:location_id]
    add_index :historical_emissions_searchable_records, [:sector_id]
    add_index :historical_emissions_searchable_records, [:gas_id]
    add_index :historical_emissions_searchable_records, [:id], unique: true
    execute 'CREATE INDEX index_searchable_emissions_path_ops ON historical_emissions_searchable_records USING GIN (emissions_dict jsonb_path_ops)'
  end

  def down
    create_view :historical_emissions_normalised_records, materialized: true, version: 1
    create_view :historical_emissions_records_emissions, materialized: true, version: 1
    create_view :historical_emissions_searchable_records, materialized: true, version: 1
  end
end
