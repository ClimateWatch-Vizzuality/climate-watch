# This migration comes from data_uploader (originally 20180926092245)
class CreateSections < ActiveRecord::Migration[5.2]
  def up
    if table_exists?(:sections)
      execute "DELETE FROM schema_migrations WHERE version='20181026095004'"
      return
    end
    create_table :sections do |t|
      t.string :name
      t.references :platform, foreign_key: true
    end
  end

  def down
    drop_table :sections
  end
end
