module Admin
  module UseCase
    class DownloadZippedDatafiles < Admin::UseCase::Base
      def call(attrs, callbacks)
        datasets = repository.filter_by_section_and_platform(
          attrs[:section_name],
          attrs[:platform_name]
        )

        datafiles = datasets.map(&:datafile).map(&:attachment).compact

        validate_datafiles datafiles

        zip_filename = "#{attrs[:platform_name]}-#{attrs[:section_name]}-datafiles"

        Admin::ZipAndDownload.call(
          s3_folder_path,
          zip_filename,
          datafiles
        )

        File.open("tmp_dir/#{zip_filename}.zip", 'r') do |f|
          callbacks[:send_data_to_client].call(f, zip_filename)
        end

        remove_tmp_dir
      end

      private

      def validate_datafiles(datafiles)
        datafiles.empty? && callbacks[:datafiles_empty].call
      end

      def remove_tmp_dir
        FileUtils.rm_rf('tmp_dir')
      end
    end
  end
end
