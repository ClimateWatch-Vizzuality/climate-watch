class CreateSdgs < ActiveRecord::Migration[5.1]
  def change
    create_table :sdgs do |t|
      t.text :number, null: false, index: {unique: true}
      t.text :title, null: false
      t.text :cw_title, null: false

      t.timestamps
    end
  end
end
