require 'fileutils'
require 'zip'

class GenerateZIPFiles
  include ClimateWatchEngine::CSVImporter

  FILEPATH = "#{CW_FILES_PREFIX}zip_files/zip_files.csv".freeze
  UPLOAD_PREFIX = 'climate-watch-download-zip'.freeze
  TEMP_DIR = Rails.root.join('tmp', 'zip_files')
  IGNORE = ['ALL DATA', 'NDC TEXT IN HTML', 'PATHWAYS'].freeze

  def call
    load_structure
    generate_and_upload_files
  end

  private

  def load_structure
    parsed_data = S3CSVReader.read(FILEPATH)
    @structure = parsed_data.map(&:to_h)
    @zip_files = @structure.
      reject { |s| IGNORE.include? s[:drop_down] }.
      map { |s| s[:zip_file] }.
      uniq
  end

  def generate_and_upload_files
    @temp_dir = "#{TEMP_DIR}/#{Time.now.strftime('%Y%m%d%H%M%S')}"
    puts "Creating #{@temp_dir}"
    FileUtils.mkdir_p(@temp_dir)
    @zip_files.each do |zip_file|
      generate_file(zip_file)
    end
    @zip_files.each do |zip_file|
      upload_file(zip_file)
    end
  ensure
    puts "Removing #{@temp_dir}"
    FileUtils.rm_rf(@temp_dir)
  end

  def generate_file(zip_file)
    file_configs = @structure.select { |s| s[:zip_file] == zip_file }
    zip_filename = File.join(@temp_dir, zip_file)

    puts "Creating ZIP file #{zip_filename}"

    Zip::File.open(zip_filename, create: true) do |zipfile|
      file_configs.each do |file_config|
        s3_folder = file_config[:s3_folder]
        s3_file = file_config[:file_name_raw]
        s3_filename = "#{CW_FILES_PREFIX}#{s3_folder}/#{s3_file}"
        tmp_file = File.join(@temp_dir, s3_folder, s3_file)
        FileUtils.mkdir_p(File.dirname(tmp_file))
        file_content = s3_download_file(s3_filename)
        File.write(tmp_file, file_content)
        zipfile.add(file_config[:file_name_zip], tmp_file)
      end
    end

    puts "ZIP file #{zip_filename} created"
  end

  def upload_file(zip_file)
    zip_filepath = File.join(@temp_dir, zip_file)
    s3_filename = "#{CW_FILES_PREFIX}#{UPLOAD_PREFIX}/#{zip_file}"
    raise "File #{zip_file} not uploaded" unless s3_upload_file(s3_filename, zip_filepath)
  end

  def s3_download_file(filename)
    puts "Downloading from S3 #{s3_bucket}: #{filename}..."
    s3_client.get_object(bucket: s3_bucket, key: filename).body.read
  rescue Aws::S3::Errors::NoSuchKey
    puts "File #{filename} not found in #{s3_bucket}"
  end

  def s3_upload_file(filename, filepath)
    puts "Uploading #{filepath} to S3..."
    File.open(filepath, 'rb') do |file|
      response = s3_client.put_object(
        bucket: s3_bucket,
        key: filename,
        body: file
      )
      return true if response.etag

      false
    end
  rescue StandardError => e
    puts "Error uploading object: #{e.message}"
    false
  end

  def s3_client
    @s3_client ||= Aws::S3::Client.new
  end

  def s3_bucket
    Rails.application.secrets.s3_bucket_name
  end
end
