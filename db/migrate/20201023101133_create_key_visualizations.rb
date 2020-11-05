class CreateKeyVisualizations < ActiveRecord::Migration[5.2]
  def change
    create_table :key_visualizations do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :topic, null: false
      t.text :embed_code
      t.text :image_download_url
      t.text :data_download_url
      t.text :blog_link
      t.integer :order, null: false
      t.string :geographies, array: true, default: []
      t.string :tags, array: true, default: []
      t.date :created_date, null: false
      t.date :last_updated_date, null: false

      t.timestamps
    end
  end
end
