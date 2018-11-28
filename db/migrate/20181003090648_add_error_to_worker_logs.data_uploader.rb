# This migration comes from data_uploader (originally 20181003090648)
class AddErrorToWorkerLogs < ActiveRecord::Migration[5.2]
  def up
    if column_exists?(:worker_logs, :error)
      execute "DELETE FROM schema_migrations WHERE version='20181026095007'"
      return
    end
    add_column :worker_logs, :error, :text
  end

  def down
    remove_column :worker_logs, :error
  end
end
