class AddIsInEUtoLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :is_in_eu, :boolean
  end
end
