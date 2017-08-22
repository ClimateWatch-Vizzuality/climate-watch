class CreateHeGases < ActiveRecord::Migration[5.1]
  def change
    create_table :he_gases do |t|
      t.text :name
      t.timestamps
    end
  end
end
