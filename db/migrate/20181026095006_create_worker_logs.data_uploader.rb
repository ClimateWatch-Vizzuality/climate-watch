# This migration comes from data_uploader (originally 20181002152649)
class CreateWorkerLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :worker_logs do |t|
      t.integer :state
      t.string :jid
      t.references :section, foreign_key: true

      t.timestamps
    end
    
    add_index(:worker_logs, :jid)
  end
end
