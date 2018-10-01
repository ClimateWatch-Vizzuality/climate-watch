class ImportSdgsWorker
  include Sidekiq::Worker

  def perform
    ImportSdgs.new.call
  end
end
