class AddCurrentPoliciesScenarioToIndcGlobalEmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_global_emissions, :current_policies_scenario, :decimal
  end
end
