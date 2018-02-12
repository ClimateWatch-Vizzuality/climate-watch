class AddTagsToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :tags, :string, array: true, default: []
  end
end
