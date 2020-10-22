ActiveAdmin.register_page 'Global Cw Platform Blog Stories' do
  include DataUploader::SharedAdmin

  section_name = 'blog_stories'
  platform_name = 'global_cw_platform'

  controller do
    def section_name
      'blog_stories'
    end

    def platform_name
      'global_cw_platform'
    end

    def path
      admin_global_cw_platform_blog_stories_path
    end

    def section
      section_repository.filter_by_section_and_platform(
        section_name,
        platform_name
      )
    end

    def import_worker
      DataUploader::BaseImportWorker.perform_async(section.id, 'ImportStories', current_admin_user.email)
    end

    def section_repository
      @section_repository ||= DataUploader::Repositories::SectionRepository.new
    end
  end

  menu parent: 'Climate Watch Global',
       label: section_name.split('_').map(&:capitalize).join(' '),
       if: proc { DataUploader::Helpers::Ability.can_view?(platform_name) }

  section_proc = proc {
    DataUploader::Repositories::SectionRepository.new.filter_by_section_and_platform(
      section_name,
      platform_name
    )
  }

  content do
    render partial: 'admin/blog_stories', locals: {
      import_path: admin_global_cw_platform_blog_stories_run_importer_path,
      abort_path: admin_global_cw_platform_blog_stories_abort_importer_path,
      logs: section_proc.call.worker_logs.order(created_at: :desc)
    }
  end
end
