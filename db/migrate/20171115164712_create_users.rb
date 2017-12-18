class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :ct_id
      t.timestamps

      t.index :ct_id
    end
  end
end
