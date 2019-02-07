ActiveAdmin.register_page 'Global CW Platform NDC Texts' do
  include DataUploader::SharedAdmin

  section_name = 'ndc_texts'
  platform_name = 'global_cw_platform'
  s3_folder_path = "#{CW_FILES_PREFIX}ndc_texts"

  menu parent: 'Climate Watch Global',
       label: section_name.split('_').map(&:capitalize).join(' '),
       if: proc { DataUploader::Helpers::Ability.can_view?(platform_name) }

  datasets = proc {
    DataUploader::Repositories::DatasetRepository.new.filter_by_section_and_platform(
      section_name,
      platform_name
    )
  }

  content do
    render partial: 'admin/form_upload_ndc_texts', locals: {
      datasets: datasets.call,
      upload_path: admin_global_cw_platform_ndc_texts_upload_datafile_path,
      download_path: admin_global_cw_platform_ndc_texts_download_datafiles_path
    }
  end

  page_action :upload_datafile, method: :post do
    return if params[:datafile].nil?

    dataset = DataUploader::Dataset.find(params[:dataset_id])

    if params[:datafile].content_type != 'application/zip'
      redirect_to admin_global_cw_platform_ndc_texts_path, alert: "Upload failed
        due to wrong file extension. File's extension should be .zip!"
      return
    end

    dataset.datafile.attach(params[:datafile])
    DataUploader::UnzipAndUpload.call(s3_folder_path, dataset.datafile.attachment)

    notice = 'Uploaded succesfully!'
    redirect_to admin_global_cw_platform_ndc_texts_path, notice: notice
  end

  page_action :download_datafiles, method: :post do
    datafiles = datasets.call.map(&:datafile).map(&:attachment).compact
    datafiles.empty? && return

    zip_filename = 'archive'

    DataUploader::S3Downloader.call([], s3_folder_path)

    File.open("tmp_dir/#{zip_filename}.zip", 'r') do |f|
      send_data f.read.force_encoding('BINARY'),
                filename: "#{zip_filename}.zip",
                type: 'application/zip',
                disposition: 'attachment'
    end

    FileUtils.rm_rf('tmp_dir')
  end
end
