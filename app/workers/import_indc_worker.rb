class ImportIndcWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportIndc.new.call
  end
end
