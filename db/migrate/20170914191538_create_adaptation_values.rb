class CreateAdaptationValues < ActiveRecord::Migration[5.1]
  def change
    create_table :adaptation_values do |t|
      t.references :variable,
                   foreign_key: {
                     to_table: :adaptation_variables,
                     on_delete: :cascade
                   }
      t.references :location,
                   foreign_key: {
                     on_delete: :cascade
                   }
      t.text :string_value
      t.float :number_value
      t.boolean :boolean_value
      t.integer :absolute_rank
      t.float :relative_rank
      t.timestamps
    end
  end
end
