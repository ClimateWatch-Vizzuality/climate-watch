class CreateIndcTimelines < ActiveRecord::Migration[5.2]
  def change
    create_table :indc_timelines do |t|
      t.references :location, foreign_key: {
        to_table: :locations,
        on_delete: :cascade
      }, null: false
      t.string :submission
      t.date :date
      t.string :url

      t.timestamps
    end
  end
end
