class ImportLocationMembersWorker
  include Sidekiq::Worker

  sidekiq_options queue: :database

  def perform
    ImportLocationMembers.new.call
  end
end
