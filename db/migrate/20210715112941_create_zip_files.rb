class CreateZipFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :zip_files do |t|
      t.string :dropdown_title, null: false
      t.string :zip_filename, null: false
      t.bigint :byte_size
      t.string :metadata, array: true, default: []
      t.jsonb :files, default: {}

      t.timestamps
    end
  end
end
