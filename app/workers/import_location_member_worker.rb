class ImportLocationMembersWorker
  include Sidekiq::Worker

  def perform
    ImportLocationMembers.new.call
  end
end
