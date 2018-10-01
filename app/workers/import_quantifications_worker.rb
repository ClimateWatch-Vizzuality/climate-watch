class ImportQuantificationsWorker
  include Sidekiq::Worker

  def perform
    ImportQuantifications.new.call
  end
end
