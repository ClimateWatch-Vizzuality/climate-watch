class CreateQuantificationValues < ActiveRecord::Migration[5.1]
  def change
    create_table :quantification_values do |t|
      t.references :location,
                   foreign_key: {
                     on_delete: :cascade
                   }
      t.references :label,
                   foreign_key: {
                     to_table: :quantification_labels,
                     on_delete: :cascade
                   }
      t.integer :year
      t.float :value
      t.boolean :range

      t.timestamps
    end
  end
end
