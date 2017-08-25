class CreateSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :sectors do |t|
      t.references :parent, foreign_key: {to_table: :sectors, on_delete: :cascade}
      t.references :data_source, foreign_key: {on_delete: :cascade}
      t.text :name
      t.timestamps
    end
  end
end
