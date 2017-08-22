class RenameLocationsColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :locations, :pik, :pik_name
    rename_column :locations, :cait, :cait_name
    rename_column :locations, :ndcp_navigators, :ndcp_navigators_name
    rename_column :locations, :country_group, :group
    add_index :locations, :code
  end
end
