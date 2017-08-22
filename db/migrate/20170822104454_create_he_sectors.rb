class CreateHeSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :he_sectors do |t|
      t.references :parent, foreign_key: {to_table: :he_sectors, on_delete: :cascade}
      t.references :he_data_source, foreign_key: {on_delete: :cascade}
      t.text :name
      t.timestamps
    end
  end
end
