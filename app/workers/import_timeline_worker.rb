class ImportTimelineWorker
  include Sidekiq::Worker

  def perform
    ImportTimeline.new.call
  end
end
