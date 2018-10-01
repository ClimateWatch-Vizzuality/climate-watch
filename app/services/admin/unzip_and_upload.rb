module Admin
  class UnzipAndUpload
    attr_reader :folder_name, :s3_file, :bucket

    def initialize(folder_name, s3_file)
      @folder_name = folder_name
      @s3_file = s3_file
      bucket_name = ENV['S3_BUCKET_NAME']
      s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
      @bucket = s3.bucket(bucket_name)
    end

    class << self
      def call(folder_name, s3_file)
        new(folder_name, s3_file).call
      end
    end

    def call
      unzip_and_upload
    end

    private

    def unzip_and_upload
      Zip::File.open(path_to_file(s3_file)) do |zip_file|
        zip_file.each do |f|
          f_path = File.join('tmp_dir', f.name)
          FileUtils.mkdir_p(File.dirname(f_path))
          zip_file.extract(f, f_path) unless File.exist?(f_path)

          path_with_folder_on_s3 = "#{folder_name}/#{f.name}"
          obj = bucket.object(path_with_folder_on_s3)

          File.file?(f_path) && obj.upload_file(f_path)
        end
      end

      FileUtils.rm_rf('tmp_dir')
    end

    def path_to_file(s3_file)
      active_storage_disk_service =
        ActiveStorage::Service::DiskService.new(root: Rails.root.to_s + '/storage/')
      active_storage_disk_service.send(:path_for, s3_file.blob.key)
    end
  end
end
