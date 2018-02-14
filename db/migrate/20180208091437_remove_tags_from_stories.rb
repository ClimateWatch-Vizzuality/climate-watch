class RemoveTagsFromStories < ActiveRecord::Migration[5.1]
  def change
    remove_column :stories, :tags, :string
  end
end
