# This migration comes from data_uploader (originally 20180926092216)
class CreatePlatforms < ActiveRecord::Migration[5.2]
  def up
    if table_exists?(:platforms)
      execute "DELETE FROM schema_migrations WHERE version='20181026095003'"
      return
    end
    create_table :platforms do |t|
      t.string :name
    end
  end

  def down
    drop_table :platforms
  end
end
