class ChangeHistoricalEmissionsRecords < ActiveRecord::Migration[5.1]
  def change
    remove_column :historical_emissions_records, :gwp
    add_reference :historical_emissions_records, :gwp, foreign_key: {
      to_table: :historical_emissions_gwps
    }
  end
end
