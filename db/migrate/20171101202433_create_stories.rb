class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.string :title
      t.text :description
      t.datetime :published_at
      t.string :background_image_url
      t.string :link

      t.timestamps
    end
  end
end
