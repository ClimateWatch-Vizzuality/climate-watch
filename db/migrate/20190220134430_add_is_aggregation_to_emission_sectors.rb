class AddIsAggregationToEmissionSectors < ActiveRecord::Migration[5.2]
  def change
    add_column :historical_emissions_sectors, :is_aggregation, :boolean, default: false
  end
end
