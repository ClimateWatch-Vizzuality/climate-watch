class CreateZipFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :zip_files do |t|
      t.string :dropdown_title
      t.string :zip_filename
      t.string :metadata, array: true, default: []
      t.jsonb :files, default: {}

      t.timestamps
    end
  end
end
