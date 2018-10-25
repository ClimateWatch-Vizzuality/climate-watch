ActiveAdmin.register_page 'Global Cw Platform Locations' do
  include SharedAdmin

  section_name = 'locations'
  platform_name = 'global_cw_platform'

  controller do
    def section_name
      'locations'
    end

    def platform_name
      'global_cw_platform'
    end

    def s3_folder_path
      "#{CW_FILES_PREFIX_TEST}locations"
    end

    def path
      admin_global_cw_platform_locations_path
    end

    def section
      section_repository.filter_by_section_and_platform(
        section_name,
        platform_name
      )
    end

    def import_worker
      ImportLocationsWorker.perform_async(section.id)
    end

    def section_repository
      @section_repository ||= SectionRepository.new
    end

    def dataset_repository
      @dataset_repository ||= DatasetRepository.new
    end
  end

  menu parent: 'Climate Watch Global',
       label: section_name.capitalize,
       if: proc { Admin::Ability.can_view?(platform_name) }

  section = SectionRepository.new.filter_by_section_and_platform(
    section_name,
    platform_name
  )

  datasets = DatasetRepository.new.filter_by_section(section.id)

  content do
    render partial: 'admin/form_upload_datasets', locals: {
      datasets: datasets,
      upload_path: admin_global_cw_platform_locations_upload_datafile_path,
      download_path: admin_global_cw_platform_locations_download_datafiles_path,
      download_single_data_file_path: admin_global_cw_platform_locations_download_datafile_path,
      import_path: admin_global_cw_platform_locations_run_importer_path,
      import_button_disabled: section.worker_logs.started.any?,
      logs: section.worker_logs.order(created_at: :desc)
    }
  end
end
