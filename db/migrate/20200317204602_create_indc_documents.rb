class CreateIndcDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :indc_documents do |t|
      t.integer :ordering
      t.string :slug
      t.string :long_name
      t.text :description

      t.timestamps
    end
    add_index :indc_documents, :ordering, unique: true
    add_index :indc_documents, :slug, unique: true
  end
end
