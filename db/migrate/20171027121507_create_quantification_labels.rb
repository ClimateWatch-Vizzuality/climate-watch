class CreateQuantificationLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :quantification_labels do |t|
      t.text :name, null: false

      t.timestamps
    end
    add_index :quantification_labels, :name, unique: true
  end
end
