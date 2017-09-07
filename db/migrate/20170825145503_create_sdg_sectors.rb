class CreateSdgSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :sdg_sectors do |t|
      t.text :name

      t.timestamps
    end
  end
end
