class CreateWriMetadataValue < ActiveRecord::Migration[5.1]
  def change
    create_table :wri_metadata_values do |t|
      t.references :source, foreign_key: {to_table: :wri_metadata_sources, on_delete: :cascade}
      t.references :property, foreign_key: {to_table: :wri_metadata_properties, on_delete: :cascade}
      t.text :value
      t.timestamps
    end

   add_index :wri_metadata_values, [:source_id, :property_id],
             unique: true, name: 'source_id_property_id_index'
  end
end
