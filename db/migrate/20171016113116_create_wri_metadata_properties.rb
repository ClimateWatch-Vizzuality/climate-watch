class CreateWriMetadataProperties < ActiveRecord::Migration[5.1]
  def change
    create_table :wri_metadata_properties do |t|
      t.text :slug
      t.text :name
      t.timestamps
    end

    add_index :wri_metadata_properties, :slug, unique: true
  end
end
