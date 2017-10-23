class CreateUnfcccNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :unfccc_notes do |t|
      t.references :record, foreign_key: {to_table: :unfccc_records, on_delete: :cascade}
      t.text :note
      t.timestamps
    end
  end
end
