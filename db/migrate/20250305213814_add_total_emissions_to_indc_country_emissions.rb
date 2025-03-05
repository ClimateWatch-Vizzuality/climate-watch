class AddTotalEmissionsToIndcCountryEmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_country_emissions, :total_emissions, :float
  end
end
