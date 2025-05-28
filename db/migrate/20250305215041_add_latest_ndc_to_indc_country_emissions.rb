class AddLatestNdcToIndcCountryEmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_country_emissions, :latest_ndc, :text
  end
end
