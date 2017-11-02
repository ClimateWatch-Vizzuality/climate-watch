class CreateNewIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    create_table :indc_indicators do |t|
      t.references :source, foreign_key: {
        to_table: :indc_sources,
        on_delete: :cascade
      }, null: false
      t.text :slug, null: false
      t.text :name, null: false
      t.text :description
      t.timestamps
    end

    add_index :indc_indicators, :slug, unique: true
  end
end
