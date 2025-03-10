class Add2019FieldsToIndcCountryEmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_country_emissions, :historical_cw2019, :float
    add_column :indc_country_emissions, :baseline2019_2030_uc, :float
    add_column :indc_country_emissions, :baseline2019_2030_uc_percentage, :float
    add_column :indc_country_emissions, :baseline2019_2035_uc, :float
    add_column :indc_country_emissions, :baseline2019_2035_uc_percentage, :float
    add_column :indc_country_emissions, :baseline2019_2035_c, :float
    add_column :indc_country_emissions, :baseline2019_2035_c_percentage, :float
  end
end
