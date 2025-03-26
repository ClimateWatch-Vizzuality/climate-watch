class AddBaseline2030FieldsCountryBreakdown < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_country_emissions, :baseline1990_2030_c, :float
    add_column :indc_country_emissions, :baseline2005_2030_c, :float
    add_column :indc_country_emissions, :baseline2019_2030_c, :float
    add_column :indc_country_emissions, :baseline1990_2030_c_percentage, :float
    add_column :indc_country_emissions, :baseline2005_2030_c_percentage, :float
    add_column :indc_country_emissions, :baseline2019_2030_c_percentage, :float
  end
end
