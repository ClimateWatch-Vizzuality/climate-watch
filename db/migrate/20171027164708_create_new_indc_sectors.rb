class CreateNewIndcSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_sectors do |t|
      t.references :parent, foreign_key: {
        to_table: :indc_sectors,
        on_delete: :cascade
      }
      t.text :name, null: false
      t.text :slug, null: false
      t.timestamps
    end

    add_index :indc_sectors, :slug, unique: true
  end
end
