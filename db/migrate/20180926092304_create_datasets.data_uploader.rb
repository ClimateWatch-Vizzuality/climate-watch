# This migration comes from data_uploader (originally 20180926092304)
class CreateDatasets < ActiveRecord::Migration[5.2]
  def up
    if table_exists?(:datasets)
      execute "DELETE FROM schema_migrations WHERE version='20181026095005'"
      return
    end
    create_table :datasets do |t|
      t.string :name
      t.references :section, foreign_key: true
    end
  end

  def down
    drop_table :datasets
  end
end
