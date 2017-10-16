class AddAnnexTypeToHistoricalEmissionsSectors < ActiveRecord::Migration[5.1]
  def change
    add_column :historical_emissions_sectors, :annex_type, :text
  end
end
