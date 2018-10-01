ActiveAdmin.register_page 'Global Cw Platform Indc' do
  section_name = 'indc'
  platform_name = 'global_cw_platform'
  s3_folder_path = "#{CW_FILES_PREFIX_TEST}indc"

  menu parent: 'Climate Watch Global', label: section_name.capitalize

  content do
    render partial: 'admin/form_upload_datasets', locals: {
      datasets: Admin::Dataset.joins(:section).
        where(sections: {name: section_name}).
        where(sections: {platform_id: Admin::Platform.find_by(name: platform_name).id}),
      upload_path: admin_global_cw_platform_indc_upload_datafile_path,
      download_path: admin_global_cw_platform_indc_download_datafiles_path,
      download_single_data_file_path: admin_global_cw_platform_indc_download_datafile_path,
      import_path: admin_global_cw_platform_indc_run_importer_path
    }
  end

  page_action :upload_datafile, method: :post do
    dataset = Admin::Dataset.find(params[:dataset_id])

    if params[:datafile].content_type != 'text/csv'
      redirect_to admin_global_cw_platform_indc_path, alert: "Upload failed
        due to wrong file extension. File's extension should be .csv!"
      return
    end

    expected_filename = "#{dataset.name}.csv"

    params[:datafile].original_filename =
      Admin::CheckAndCorrectFilename.call(params[:datafile].original_filename, expected_filename)

    dataset.datafile.attach(params[:datafile])

    Admin::S3Uploader.call(
      dataset.datafile.attachment,
      s3_folder_path
    )

    notice = 'Uploaded succesfully!'
    redirect_to admin_global_cw_platform_indc_path, notice: notice
  end

  page_action :download_datafile, method: :post do
    dataset = Admin::Dataset.find(params[:dataset_id])
    datafile = dataset.datafile.attachment
    return unless datafile

    Admin::S3Downloader.call(datafile, 'test')

    File.open("tmp_dir/#{datafile.filename}", 'r') do |f|
      send_data f.read.force_encoding('BINARY'),
                filename: datafile.filename.to_s,
                disposition: 'attachment'
    end
    FileUtils.rm_rf('tmp_dir')
  end

  page_action :download_datafiles, method: :post do
    datasets = Admin::Dataset.joins(:section).
      where(sections: {name: section_name}).
      where(sections: {platform_id: Admin::Platform.find_by(name: platform_name).id})

    datafiles = datasets.map(&:datafile).map(&:attachment).compact
    datafiles.empty? && return

    zip_filename = "#{platform_name}-#{section_name}-datafiles"
    Admin::ZipAndDownload.call('test', zip_filename, datafiles)

    File.open("tmp_dir/#{zip_filename}.zip", 'r') do |f|
      send_data f.read.force_encoding('BINARY'),
                filename: "#{zip_filename}.zip",
                type: 'application/zip',
                disposition: 'attachment'
    end
    FileUtils.rm_rf('tmp_dir')
  end

  page_action :run_importer, method: :post do
    @job_id = ImportIndcWorker.perform_async
    notice = "Files import #{@job_id} scheduled. Check status --> /sidekiq"

    redirect_to admin_global_cw_platform_indc_path, notice: notice
  end
end
