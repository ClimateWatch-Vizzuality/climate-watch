require 'aws-sdk-s3'

class S3Uploader
  include Singleton
  def initialize
    @bucket_name = ENV['S3_BUCKET_NAME']
    @s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
  end

  # @param s3_filename name of S3 object
  # @param local_filename name of local dump file
  def call(s3_filename, local_filename, folder_name, metadata = {})
    path_with_folder = `#{folder_name}/#{s3_filename}`
    obj = @s3.bucket(@bucket_name).object(path_with_folder)
    obj.upload_file(local_filename, metadata: metadata)
  end
end
