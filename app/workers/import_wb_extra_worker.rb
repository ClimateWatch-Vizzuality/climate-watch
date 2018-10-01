class ImportWbExtraWorker
  include Sidekiq::Worker

  def perform
    ImportWbExtra.new.call
  end
end
