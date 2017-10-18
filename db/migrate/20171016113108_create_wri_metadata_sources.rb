class CreateWriMetadataSources < ActiveRecord::Migration[5.1]
  def change
    create_table :wri_metadata_sources do |t|
      t.text :name
      t.timestamps
    end
  end
end
