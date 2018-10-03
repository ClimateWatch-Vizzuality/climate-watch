module SharedAdmin
  extend ActiveSupport::Concern

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def self.included(base)
    base.send(:page_action, :upload_datafile, method: :post) do
      return if params[:datafile].nil?

      dataset = Admin::Dataset.find(params[:dataset_id])

      if params[:datafile].content_type != 'text/csv'
        redirect_to path, alert: "Upload failed
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

      run_uploader

      notice = 'Uploaded succesfully!'
      redirect_to path, notice: notice
    end

    base.send(:page_action, :download_datafile, method: :post) do
      dataset = Admin::Dataset.find(params[:dataset_id])
      datafile = dataset.datafile.attachment
      return unless datafile

      Admin::S3Downloader.call(datafile, s3_folder_path)

      File.open("tmp_dir/#{datafile.filename}", 'r') do |f|
        send_data f.read.force_encoding('BINARY'),
                  filename: datafile.filename.to_s,
                  disposition: 'attachment'
      end
      FileUtils.rm_rf('tmp_dir')
    end

    base.send(:page_action, :download_datafiles, method: :post) do
      datafiles = datasets.map(&:datafile).map(&:attachment).compact
      datafiles.empty? && return

      zip_filename = "#{platform_name}-#{section_name}-datafiles"

      Admin::ZipAndDownload.call(s3_folder_path, zip_filename, datafiles)

      File.open("tmp_dir/#{zip_filename}.zip", 'r') do |f|
        send_data f.read.force_encoding('BINARY'),
                  filename: "#{zip_filename}.zip",
                  type: 'application/zip',
                  disposition: 'attachment'
      end
      FileUtils.rm_rf('tmp_dir')
    end

    base.send(:page_action, :run_importer, method: :post) do
      import_worker
      notice = "Files import scheduled. This might take to few minutes,
        please refresh the page to see the status in logs table below."

      redirect_to admin_global_cw_platform_adaptation_path, notice: notice
    end
  end
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Metrics/AbcSize
end
