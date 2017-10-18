class CreateWriMetadataAcronyms < ActiveRecord::Migration[5.1]
  def change
    create_table :wri_metadata_acronyms do |t|
      t.text :acronym
      t.text :definition
      t.timestamps
    end

    add_index :wri_metadata_acronyms, :acronym, unique: true
  end
end
