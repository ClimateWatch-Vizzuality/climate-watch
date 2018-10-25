class AddErrorToWorkerLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :worker_logs, :error, :text
  end
end
