ActiveAdmin.register_page 'India Platform Historical Emissions' do
  section_name = 'historical_emissions'
  platform_name = 'india_platform'
  menu parent: 'India Platform',
       label: section_name.split('_').map(&:capitalize).join(' '),
       if: proc { DataUploader::Helpers::Ability.can_view?(platform_name) }

  content do
    render partial: 'admin/form_upload_datasets', locals: {
      datasets: Admin::Dataset.joins(:section).
        where(sections: {name: section_name}).
        where(sections: {platform_id: Admin::Platform.find_by(name: platform_name).id}),
      upload_path: admin_india_platform_historical_emissions_upload_datafile_path,
      download_path: admin_india_platform_historical_emissions_download_datafiles_path,
      download_single_data_file_path:
        admin_india_platform_historical_emissions_download_datafile_path,
      import_path: admin_india_platform_historical_emissions_run_importer_path
    }
  end

  page_action :upload_datafile, method: :post do
    return if params[:datafile].nil?

    dataset = Admin::Dataset.find(params[:dataset_id])
    dataset.datafile.attach(params[:datafile])

    Admin::S3Uploader.call(
      dataset.datafile.attachment,
      'test'
    )

    notice = 'Uploaded succesfully!'
    redirect_to admin_india_platform_historical_emissions_path, notice: notice
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

    datafiles = datasets.map(&:datafile).map(&:attachment)
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
    # TODO: Call respective importer when it's implemented.
  end
end
