class CreateUserStories < ActiveRecord::Migration[5.1]
  def change
    create_table :user_stories do |t|
      t.string :title
      t.jsonb :body
      t.boolean :public
      t.timestamps

      t.integer :user_id
      t.foreign_key :users
    end
  end
end
