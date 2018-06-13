class RemoveNameAndAreaOfWorkFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :name, :string
    remove_column :users, :areaOfWork, :string
  end
end
