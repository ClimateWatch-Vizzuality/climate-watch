class ImportWriMetadataWorker
  include Sidekiq::Worker

  def perform
    ImportWriMetadata.new.call
  end
end
