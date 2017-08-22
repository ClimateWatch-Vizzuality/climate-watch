class CreateHeRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :he_records do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.references :he_sector, foreign_key: {on_delete: :cascade}
      t.references :he_gas, foreign_key: {on_delete: :cascade}
      t.text :gwp
      t.integer :year
      t.decimal :value
      t.timestamp
    end
  end
end
