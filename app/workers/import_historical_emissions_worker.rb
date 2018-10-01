class ImportHistoricalEmissionsWorker
  include Sidekiq::Worker

  def perform
    ImportHistoricalEmissions.new.call
  end
end
