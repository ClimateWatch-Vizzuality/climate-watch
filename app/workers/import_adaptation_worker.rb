class ImportAdaptationWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportAdaptation.new.call
  end
end
