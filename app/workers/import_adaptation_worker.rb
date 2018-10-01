class ImportAdaptationWorker
  include Sidekiq::Worker

  def perform
    ImportAdaptation.new.call
  end
end
