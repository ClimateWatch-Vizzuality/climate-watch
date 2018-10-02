class ImportQuantificationsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportQuantifications.new.call
  end
end
