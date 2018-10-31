# This migration comes from data_uploader (originally 20181002152649)
class CreateWorkerLogs < ActiveRecord::Migration[5.2]
  def up
    if table_exists?(:worker_logs)
      execute "DELETE FROM schema_migrations WHERE version='20181026095006'"
      return
    end
    create_table :worker_logs do |t|
      t.integer :state
      t.string :jid
      t.references :section, foreign_key: true

      t.timestamps
    end
    
    add_index(:worker_logs, :jid)
  end

  def down
    drop_table :worker_logs
  end
end
