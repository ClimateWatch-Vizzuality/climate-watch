class CreateGases < ActiveRecord::Migration[5.1]
  def change
    create_table :gases do |t|
      t.text :name
      t.timestamps
    end
  end
end
