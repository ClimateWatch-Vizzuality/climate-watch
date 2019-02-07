# This migration comes from data_uploader (originally 20181129153835)
class AddDetailsToWorkerLogs < ActiveRecord::Migration[5.2]
  def up
    unless column_exists? :worker_logs, :details
      add_column :worker_logs, :details, :jsonb, default: {}
      DataUploader::WorkerLog.find_each do |log|
        log.update!(details: { errors: [{ type: :error, msg: log.error }] })
      end
    end
    if column_exists? :worker_logs, :error
      remove_column :worker_logs, :error
    end
  end

  def down
    add_column :worker_logs, :error, :text
    DataUploader::WorkerLog.find_each do |log|
      log.update!(error: log.details&.dig('errors')&.first&.dig('msg'))
    end
    remove_column :worker_logs, :details
  end
end
