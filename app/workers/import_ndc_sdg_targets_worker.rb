class ImportNdcSdgTargetsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportNdcSdgTargets.new.call
  end
end
