class ImportSocioeconomicsWorker
  include Sidekiq::Worker

  def perform
    ImportSocioeconomics.new.call
  end
end
