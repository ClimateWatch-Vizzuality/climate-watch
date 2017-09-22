class CreateCaitIndcSubmissions < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_submissions do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.text :submission_type, null: false
      t.text :language, null: false
      t.date :submission_date, null: false
      t.text :url, null: false
      t.timestamps
    end
  end
end
