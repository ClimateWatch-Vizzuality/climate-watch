class ImportIndcWorker
  include Sidekiq::Worker

  def perform
    ImportIndc.new.call
  end
end
