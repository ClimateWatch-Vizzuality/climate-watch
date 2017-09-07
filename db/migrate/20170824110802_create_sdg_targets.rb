class CreateSdgTargets < ActiveRecord::Migration[5.1]
  def change
    create_table :sdg_targets do |t|
      t.text :number, null: false, index: {unique: true}
      t.text :title, null: false
      t.references :sdg, foreign_key: true, null: false

      t.timestamps
    end
  end
end
