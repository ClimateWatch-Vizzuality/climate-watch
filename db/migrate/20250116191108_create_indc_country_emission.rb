class CreateIndcCountryEmission < ActiveRecord::Migration[5.2]
  def change
    create_table :indc_country_emissions do |t|
      t.references :location, foreign_key: {
        to_table: :locations,
        on_delete: :cascade
      }, null: false
      t.float :historical_cw1990
      t.float :historical_cw2005
      t.float :historical_cw2018
      t.float :targets_nfgs_uc2030
      t.float :targets_nfgs_c2030
      t.float :targets_nfgs_uc2035
      t.float :targets_nfgs_c2035
      t.float :baseline1990_2030_uc
      t.float :baseline1990_2030_uc_percentage
      t.float :baseline1990_2035_uc
      t.float :baseline1990_2035_uc_percentage
      t.float :baseline1990_2035_c
      t.float :baseline1990_2035_c_percentage
      t.float :baseline2005_2030_uc
      t.float :baseline2005_2030_uc_percentage
      t.float :baseline2005_2035_uc
      t.float :baseline2005_2035_uc_percentage
      t.float :baseline2005_2035_c
      t.float :baseline2005_2035_c_percentage
      t.float :baseline2018_2030_uc
      t.float :baseline2018_2030_uc_percentage
      t.float :baseline2018_2035_uc
      t.float :baseline2018_2035_uc_percentage
      t.float :baseline2018_2035_c
      t.float :baseline2018_2035_c_percentage
      t.float :absolute_emissions_comparison_c
      t.float :absolute_emissions_comparison_uc

      t.timestamps
    end
  end
end
