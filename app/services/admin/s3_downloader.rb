module Admin
  class S3Downloader
    include Singleton

    attr_reader :s3_files, :folder_name, :bucket

    def initialize
      bucket_name = ENV['S3_BUCKET_NAME']
      s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
      @bucket = s3.bucket(bucket_name)
    end

    class << self
      def call(s3_files, folder_name)
        instance.call(s3_files, folder_name)
      end
    end

    def call(s3_files, folder_name)
      @s3_files = s3_files
      @folder_name = folder_name

      create_tmp_dir
      download_files
    end

    private

    def create_tmp_dir
      FileUtils.mkdir_p('tmp_dir')
    end

    def download_files
      if s3_files.is_a?(Array)
        if s3_files.empty?
          download_all_files
        else
          s3_files.each do |s3_file|
            download_single_file(s3_file)
          end
        end
      else
        download_single_file(s3_files)
      end
    end

    def download_single_file(file)
      path_with_folder_on_s3 = "#{folder_name}/#{file.filename}"
      obj = bucket.object(path_with_folder_on_s3)
      obj.get(response_target: "tmp_dir/#{file.filename}")
    end

    def download_all_files
      all_files = bucket.objects(prefix: folder_name)

      Zip::File.open('tmp_dir/archive.zip', Zip::File::CREATE) do |zipfile|
        all_files.each do |file|
          file.get(response_target: "tmp_dir/#{File.basename(file.key)}")
          zipfile.add(File.basename(file.key), "tmp_dir/#{File.basename(file.key)}")
        end
      end
    end
  end
end
