class CreateUnfcccRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :unfccc_records do |t|
      t.references :document, foreign_key: {to_table: :unfccc_documents, on_delete: :cascade}
      t.references :location, foreign_key: {to_table: :locations, on_delete: :cascade}
      t.text :link
      t.text :text
      t.date :date
      t.text :language
      t.timestamps
    end
  end
end
