class AddSecondValueToQuantificationValues < ActiveRecord::Migration[5.1]
  def change
    change_column :quantification_values, :year, :integer, limit: 2
    remove_column :quantification_values, :range, :boolean
    rename_column :quantification_values, :value, :first_value
    add_column :quantification_values, :second_value, :float
  end
end
