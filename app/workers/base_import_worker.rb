class BaseImportWorker
  include Sidekiq::Worker
  include Admin::WithJobLogging

  sidekiq_options queue: :database, retry: false

  def perform(section_id)
    section = Admin::Section.find(section_id)

    return if job_in_progress?(section)

    log_job(jid, section_id) { import_data }
  end

  private

  def job_in_progress?(section)
    section.worker_logs.started.any?
  end
end
