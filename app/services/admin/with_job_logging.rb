module Admin
  module WithJobLogging
    def log_job(jid, section_id)
      create_job_log(jid, section_id) unless job_log(jid)
      yield
      mark_job_as_finished(jid)
    rescue StandardError => e
      mark_job_as_failed(jid, e)
    end

    def log_failed_job(jid, section_id)
      create_job_log(jid, section_id) unless job_log(jid)
      yield
      mark_job_as_failed(jid)
    end

    def create_job_log(jid, section_id)
      Admin::WorkerLog.create(
        jid: jid,
        state: 'started',
        section_id: section_id
      )
    end

    def job_log(jid)
      Admin::WorkerLog.find_by(jid: jid)
    end

    def mark_job_as_finished(jid)
      job_log(jid).finished!
    end

    def mark_job_as_failed(jid, error)
      job = job_log(jid)
      job.failed!
      job.error = error
      job.save!
    end
  end
end
