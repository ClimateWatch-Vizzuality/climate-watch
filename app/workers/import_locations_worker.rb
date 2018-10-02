class ImportLocationsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportLocations.new.call
  end
end
