class RenameHistoricalEmisisonsTables < ActiveRecord::Migration[5.1]
  def up
    rename_table :data_sources, :historical_emissions_data_sources
    rename_table :gases, :historical_emissions_gases
    rename_table :historical_emissions, :historical_emissions_records
    rename_table :sectors, :historical_emissions_sectors
  end
end
