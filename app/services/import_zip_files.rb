require 'fileutils'
require 'zip'

class ImportZIPFiles
  include ClimateWatchEngine::CSVImporter

  FILEPATH = "#{CW_FILES_PREFIX}zip_files/zip_files.csv".freeze
  WRI_METADATA_FILEPATH = "#{CW_FILES_PREFIX}wri_metadata/metadata_sources.csv".freeze
  UPLOAD_PREFIX = 'climate-watch-download-zip'.freeze
  TEMP_DIR = Rails.root.join('tmp', 'zip_files')
  ALL_DATA = 'ALL DATA'.freeze

  def call
    load_metadata
    load_structure
    ActiveRecord::Base.transaction do
      cleanup_zip_files
      save_zip_files
      # generate_and_upload_files
    end
  end

  private

  def load_metadata
    @metadata = S3CSVReader.read(WRI_METADATA_FILEPATH).map(&:to_h)
  end

  def load_structure
    @structure = S3CSVReader.read(FILEPATH).map(&:to_h)
    @zip_files = @structure.
      reject { |s| s[:drop_down] == ALL_DATA }.
      reject { |s| s[:s3_folder].blank? }.
      map { |s| s[:zip_file] }.
      uniq
    @zip_files_to_download = @structure.
      reject { |s| s[:drop_down] == ALL_DATA }.
      select { |s| s[:s3_folder].blank? }.
      map { |s| s[:zip_file] }.
      uniq
  end

  def cleanup_zip_files
    ZipFile.delete_all
  end

  def save_zip_files
    files = []
    @structure.each do |row|
      file = files.find { |f| f.dropdown_title == row[:drop_down] } ||
        ZipFile.new(metadata: [], files: [])
      file.dropdown_title ||= row[:drop_down]
      file.zip_filename ||= row[:zip_file]
      file.metadata.concat(Array.wrap(row[:metadata]&.split("\n")&.compact))
      file.files << {
        s3_folder: row[:s3_folder],
        filename_original: row[:file_name_raw],
        filename_zip: row[:file_name_zip]
      }
      files << file unless files.include?(file)
    end
    files.each(&:save!)
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

    download_not_generated_zip_files
    create_and_upload_all_data_zip
  ensure
    puts "Removing #{@temp_dir}"
    FileUtils.rm_rf(@temp_dir)
  end

  def download_not_generated_zip_files
    @zip_files_to_download.each do |zip_file|
      tmp_file = File.join(@temp_dir, zip_file)
      s3_filename = "#{CW_FILES_PREFIX}#{UPLOAD_PREFIX}/#{zip_file}"
      file_content = s3_download_file(s3_filename)
      File.write(tmp_file, file_content)
    end
  end

  def create_and_upload_all_data_zip
    all_data_row = @structure.find { |s| s[:drop_down] == ALL_DATA }
    zip_file = all_data_row[:zip_file]
    all_data_zip_filename = File.join(@temp_dir, zip_file)

    puts "Creating All Data ZIP file #{all_data_zip_filename}"
    Zip::File.open(all_data_zip_filename, create: true) do |zipfile|
      (@zip_files + @zip_files_to_download).each do |zip_file|
        zip_filepath = File.join(@temp_dir, zip_file)
        zipfile.add(zip_file, zip_filepath)
      end
    end
    puts "ZIP file #{all_data_zip_filename} created"
    upload_file(zip_file)
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

      metadata_filepath = create_metadata_file(zip_file)
      if metadata_filepath.present?
        zipfile.add('metadata.csv', metadata_filepath)
      else
        puts "NO Metadata to save for #{zip_filename}"
      end
    end

    puts "ZIP file #{zip_filename} created"
  end

  def create_metadata_file(zip_file)
    file_configs = @structure.select { |s| s[:zip_file] == zip_file }
    metadata_sources = file_configs.
      map { |fc| fc[:metadata]&.split("\n") }.
      compact.
      flatten.
      map(&:strip)
    tmp_file = File.join(@temp_dir, zip_file.chomp('.zip') + '_metadata.csv')
    metadata_to_save = @metadata.select { |m| metadata_sources.include?(m[:dataset]) }

    return if metadata_to_save.count.zero?

    CSV.open(tmp_file, 'wb') do |csv|
      csv << metadata_to_save.first.keys
      metadata_to_save.each do |m|
        csv << m.values
      end
    end

    tmp_file
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
    raise "File #{filename} not found in #{s3_bucket}"
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
