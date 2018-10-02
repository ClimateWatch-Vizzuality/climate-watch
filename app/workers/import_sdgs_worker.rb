class ImportSdgsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportSdgs.new.call
  end
end
