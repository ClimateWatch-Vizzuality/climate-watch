class AddIsoCode3RenameIsoCode2 < ActiveRecord::Migration[5.1]
  def change
    rename_column :locations, :code, :iso_code3
    add_column :locations, :iso_code2, :text
    execute "UPDATE locations SET iso_code2 = ''"
    change_column :locations, :iso_code2, :text, null: false
    add_index :locations, :iso_code2
  end
end
