class ImportWriMetadataWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportWriMetadata.new.call
  end
end
