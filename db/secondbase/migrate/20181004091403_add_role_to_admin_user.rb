class AddRoleToAdminUser < ActiveRecord::Migration[5.2]
  def change
    return if column_exists? :admin_users, :role
    add_column :admin_users, :role, :string
  end
end
