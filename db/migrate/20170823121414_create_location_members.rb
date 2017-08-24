class CreateLocationMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :location_members do |t|
      t.references :location, index: true, foreign_key: {on_delete: :cascade}
      t.references :member, index: true, foreign_key: {to_table: :locations, on_delete: :cascade}

      t.timestamps
    end
  end
end
