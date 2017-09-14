class CreateAdaptationVariables < ActiveRecord::Migration[5.1]
  def change
    create_table :adaptation_variables do |t|
      t.text :slug
      t.text :name
      t.timestamps
    end
    add_index :adaptation_variables, :slug, type: :unique
  end
end
