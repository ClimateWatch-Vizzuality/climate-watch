class CreateTimelineDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :timeline_documents do |t|
      t.references :source, foreign_key: {to_table: :timeline_sources, on_delete: :cascade}
      t.references :location, foreign_key: {to_table: :locations, on_delete: :cascade}
      t.text :link
      t.text :text
      t.date :date
      t.text :language
      t.timestamps
    end
  end
end
