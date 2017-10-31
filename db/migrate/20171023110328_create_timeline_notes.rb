class CreateTimelineNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :timeline_notes do |t|
      t.references :document, foreign_key: {to_table: :timeline_documents, on_delete: :cascade}
      t.text :note
      t.timestamps
    end
  end
end
