class RemoveImageFromStories < ActiveRecord::Migration[5.1]
  def change
    remove_column :stories, :image, :string
  end
end
