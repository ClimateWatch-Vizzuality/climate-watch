class CreateNdcs < ActiveRecord::Migration[5.1]
  def change
    create_table :ndcs do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.text :content
      t.text :content_tsv

      t.timestamps
    end
  end
end
