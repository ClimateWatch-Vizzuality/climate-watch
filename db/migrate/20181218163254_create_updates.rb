class CreateUpdates < ActiveRecord::Migration[5.2]
  def change
    create_table :updates do |t|
      t.string :category
      t.text :description
      t.string :link

      t.timestamps
    end
  end
end
