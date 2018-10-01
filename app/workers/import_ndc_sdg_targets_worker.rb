class ImportNdcSdgTargetsWorker
  include Sidekiq::Worker

  def perform
    ImportNdcSdgTargets.new.call
  end
end
