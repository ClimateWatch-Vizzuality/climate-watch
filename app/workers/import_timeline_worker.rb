class ImportTimelineWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportTimeline.new.call
  end
end
