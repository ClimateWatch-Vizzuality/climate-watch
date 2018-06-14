class AddDataUsageAndTesterToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :data_usage, :text
    add_column :users, :tester, :boolean
  end
end
