class AddAreaOfWorkToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :areaOfWork, :string
  end
end
