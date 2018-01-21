class AddDetailsToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :image, :string
    add_column :stories, :tags, :string
  end
end
