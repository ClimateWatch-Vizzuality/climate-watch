module Admin
  module UseCase
    class DownloadDatafile < Admin::UseCase::Base
      def call(params, callbacks)
        dataset = repository.find(params[:dataset_id])
        datafile = dataset.datafile.attachment

        callbacks[:no_datafile].call unless datafile

        Admin::S3Downloader.call(datafile, s3_folder_path)

        File.open("tmp_dir/#{datafile.filename}", 'r') do |f|
          callbacks[:send_data_to_client].call(f, datafile)
        end

        remove_tmp_dir
      end

      private

      def remove_tmp_dir
        FileUtils.rm_rf('tmp_dir')
      end
    end
  end
end
