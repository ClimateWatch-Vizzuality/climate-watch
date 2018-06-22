class AddYearToAdaptationValues < ActiveRecord::Migration[5.1]
  def change
    add_column :adaptation_values, :year, :integer
  end
end
