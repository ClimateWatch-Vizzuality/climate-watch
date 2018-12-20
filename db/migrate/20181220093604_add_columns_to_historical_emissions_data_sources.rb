class AddColumnsToHistoricalEmissionsDataSources < ActiveRecord::Migration[5.2]
  def change
    add_column :historical_emissions_data_sources, :display_name, :text
    add_column :historical_emissions_data_sources, :metadata_dataset, :text
    reversible do |dir|
      dir.up do
        execute 'UPDATE historical_emissions_data_sources SET display_name = name'
        execute "UPDATE historical_emissions_data_sources SET metadata_dataset = 'historical_emissions_' || name"
      end
      dir.down do
        # no-op
      end
    end
    change_column_null :historical_emissions_data_sources, :display_name, false
    change_column_null :historical_emissions_data_sources, :metadata_dataset, false
  end
end
