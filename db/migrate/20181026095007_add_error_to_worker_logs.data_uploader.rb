# This migration comes from data_uploader (originally 20181003090648)
class AddErrorToWorkerLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :worker_logs, :error, :text
  end
end
