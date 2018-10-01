class ImportLocationsWorker
  include Sidekiq::Worker

  def perform
    ImportLocations.new.call
  end
end
