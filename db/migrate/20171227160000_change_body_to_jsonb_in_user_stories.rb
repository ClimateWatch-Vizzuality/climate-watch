class ChangeBodyToJsonbInUserStories < ActiveRecord::Migration[5.1]
  def change
    change_column :user_stories, :body, :jsonb
  end
end
