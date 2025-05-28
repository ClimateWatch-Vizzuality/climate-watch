class ChangeGlobalEmissionToIndcGlobalEmission < ActiveRecord::Migration[5.2]
  def change
    rename_table :global_emissions, :indc_global_emissions
  end
end
