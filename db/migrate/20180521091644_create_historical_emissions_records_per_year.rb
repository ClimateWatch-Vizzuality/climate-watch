class CreateHistoricalEmissionsRecordsPerYear < ActiveRecord::Migration[5.1]
  def change
    create_view :historical_emissions_records_per_year, materialized: true
    add_index :historical_emissions_records_per_year, [:year, :id], unique: true
  end
end
