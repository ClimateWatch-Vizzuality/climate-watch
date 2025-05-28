class CreateGlobalEmission < ActiveRecord::Migration[5.2]
  def change
    create_table :global_emissions do |t|
      t.integer :year, null: false
      t.decimal :historical_emission
      t.decimal :ndcs_conditional_2020
      t.decimal :ndcs_unconditional_2020
      t.decimal :ndcs_conditional_2025
      t.decimal :ndcs_unconditional_2025
      t.decimal :target_2c
      t.decimal :target_1_5c

      t.timestamps
    end
  end
end
