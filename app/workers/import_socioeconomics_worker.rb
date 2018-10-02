class ImportSocioeconomicsWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportSocioeconomics.new.call
  end
end
