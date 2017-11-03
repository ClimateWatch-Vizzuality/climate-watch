class CreateNewIndcSources < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_sources do |t|
      t.text :name, null: false
      t.timestamps
    end

    add_index :indc_sources, :name, unique: true
  end
end
