class AddLocationTypeAndShowInCw < ActiveRecord::Migration[5.1]
  def change
    remove_column :locations, :group
    add_column :locations, :location_type, :text
    execute "UPDATE locations SET location_type = ''"
    change_column :locations, :location_type, :text, null: false
    add_column :locations, :show_in_cw, :boolean, default: true
  end
end
