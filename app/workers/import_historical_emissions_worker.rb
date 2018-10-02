class ImportHistoricalEmissionsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportHistoricalEmissions.new.call
  end
end
