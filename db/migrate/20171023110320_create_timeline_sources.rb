class CreateTimelineSources < ActiveRecord::Migration[5.1]
  def change
    create_table :timeline_sources do |t|
      t.text :name
    end
  end
end
