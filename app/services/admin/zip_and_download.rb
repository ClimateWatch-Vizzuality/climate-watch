module Admin
  class ZipAndDownload
    attr_reader :folder_name, :datafiles, :zip_filename

    def initialize(folder_name, zip_filename, datafiles = [])
      @folder_name = folder_name
      @datafiles = datafiles
      @zip_filename = zip_filename
    end

    class << self
      def call(folder_name, zip_filename, datafiles = [])
        new(folder_name, zip_filename, datafiles).call
      end
    end

    def call
      download_from_s3
      zip_files
    end

    private

    def download_from_s3
      Admin::S3Downloader.call(
        datafiles,
        folder_name
      )
    end

    def zip_files
      Zip::File.open("tmp_dir/#{zip_filename}.zip", Zip::File::CREATE) do |zipfile|
        datafiles.each do |datafile|
          zipfile.add(datafile.filename, "tmp_dir/#{datafile.filename}")
        end
      end
    end
  end
end
