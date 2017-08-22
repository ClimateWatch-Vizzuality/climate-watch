class CreateHeDataSources < ActiveRecord::Migration[5.1]
  def change
    create_table :he_data_sources do |t|
      t.text :name
      t.timestamps
    end
  end
end
