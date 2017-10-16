class CreateWbIndcSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_indc_sectors do |t|
      t.references :parent, foreign_key: {to_table: :wb_indc_sectors, on_delete: :cascade}
      t.text :name, null: false
    end
  end
end
