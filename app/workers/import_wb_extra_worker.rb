class ImportWbExtraWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportWbExtra.new.call
  end
end
