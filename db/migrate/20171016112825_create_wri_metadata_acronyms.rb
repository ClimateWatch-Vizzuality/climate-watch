class CreateWriMetadataAcronyms < ActiveRecord::Migration[5.1]
  def change
    create_table :wri_metadata_acronyms do |t|
      t.text :acronym
      t.text :definition
      t.timestamps
    end
  end
end
