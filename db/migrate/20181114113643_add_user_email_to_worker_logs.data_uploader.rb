# This migration comes from data_uploader (originally 20181113183506)
class AddUserEmailToWorkerLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :worker_logs, :user_email, :string
  end
end
