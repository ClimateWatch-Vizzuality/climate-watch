class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.text :description, null: false
      t.date :date, null: false

      t.timestamps
    end
  end
end
