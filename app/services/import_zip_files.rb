require 'fileutils'
require 'zip'

class ImportZipFiles
  include ClimateWatchEngine::CSVImporter

  ZIP_STRUCTURE_FILEPATH = "#{CW_FILES_PREFIX}zip_files/zip_files.csv".freeze
  WRI_METADATA_FILEPATH = "#{CW_FILES_PREFIX}wri_metadata/metadata_sources.csv".freeze
  TEMP_DIR = Rails.root.join('tmp', 'zip_files')
  ALL_DATA = 'ALL DATA'.freeze

  def call(upload_files: true)
    load_metadata
    load_structure
    validate
    ActiveRecord::Base.transaction do
      cleanup_zip_files
      save_zip_files
      load_zip_files
      generate_and_upload_files if upload_files
      update_file_sizes
    end
  end

  private

  def load_metadata
    @metadata = S3CSVReader.read(WRI_METADATA_FILEPATH).map(&:to_h)
  end

  def load_structure
    @structure = S3CSVReader.read(ZIP_STRUCTURE_FILEPATH).map(&:to_h)
  end

  def validate
    return if @structure.find { |s| s[:drop_down] == ALL_DATA && s[:zip_file].present? }

    raise 'ALL DATA entry must exist'
  end

  def cleanup_zip_files
    ZipFile.delete_all
  end

  # rubocop:disable AbcSize
  def save_zip_files
    files = []
    @structure.each do |row|
      file = files.find { |f| f.dropdown_title == row[:drop_down] } ||
        ZipFile.new(metadata: [], files: [])
      file.dropdown_title ||= row[:drop_down]
      file.zip_filename ||= row[:zip_file]
      file.metadata.concat(Array.wrap(row[:metadata]&.split("\n")&.compact))
      if row[:s3_folder].present?
        file.files << {
          s3_folder: row[:s3_folder],
          filename_original: row[:file_name_raw],
          filename_zip: row[:file_name_zip]
        }
      end
      files << file unless files.include?(file)
    end
    files.each(&:save!)
  end
  # rubocop:enable AbcSize

  def load_zip_files
    @zip_files = ZipFile.all
  end

  def generate_and_upload_files
    @temp_dir = "#{TEMP_DIR}/#{Time.now.strftime('%Y%m%d%H%M%S')}"
    puts "Creating #{@temp_dir}"
    FileUtils.mkdir_p(@temp_dir)
    zip_files_to_generate.each do |zip_file|
      generate_file(zip_file)
    end
    zip_files_to_generate.each do |zip_file|
      upload_file(zip_file)
    end

    download_not_generated_zip_files
    create_and_upload_all_data_zip
  ensure
    puts "Removing #{@temp_dir}"
    FileUtils.rm_rf(@temp_dir)
  end

  def update_file_sizes
    puts 'Updating file sizes in DB...'
    ZipFile.find_each do |file|
      byte_size = s3_head_file(file.s3_key).content_length
      raise "Content Length of #{file.s3_key} is 0" if byte_size.zero?

      file.update!(byte_size: byte_size)
    end
  end

  def download_not_generated_zip_files
    zip_files_to_download.each do |zip_file|
      tmp_file = File.join(@temp_dir, zip_file.zip_filename)
      file_content = s3_download_file(zip_file.s3_key)
      File.write(tmp_file, file_content)
    end
  end

  def zip_files_to_generate
    @zip_files.reject { |s| s.files.empty? }
  end

  def zip_files_to_download
    @zip_files.
      select { |s| s.files.empty? }.
      reject { |s| s.dropdown_title == ALL_DATA }
  end

  def create_and_upload_all_data_zip
    all_data = @zip_files.find { |s| s.dropdown_title == ALL_DATA }
    all_data_zip_filepath = File.join(@temp_dir, all_data.zip_filename)

    puts "Creating All Data Zip file #{all_data_zip_filepath}"
    Zip::File.open(all_data_zip_filepath, create: true) do |zip|
      (zip_files_to_generate + zip_files_to_download).each do |f|
        zip.add(f.zip_filename, File.join(@temp_dir, f.zip_filename))
      end
    end
    puts "Zip file #{all_data_zip_filepath} created"
    upload_file(all_data)
  end

  def generate_file(zip_file)
    zip_filename = File.join(@temp_dir, zip_file.zip_filename)

    puts "Creating Zip file #{zip_filename}"

    Zip::File.open(zip_filename, create: true) do |zip|
      zip_file.files.map(&:symbolize_keys).each do |file_config|
        s3_folder = file_config[:s3_folder]
        s3_file = file_config[:filename_original]
        s3_filename = "#{CW_FILES_PREFIX}#{s3_folder}/#{s3_file}"
        tmp_file = File.join(@temp_dir, s3_folder, s3_file)
        FileUtils.mkdir_p(File.dirname(tmp_file))
        file_content = s3_download_file(s3_filename)
        File.write(tmp_file, file_content)
        zip.add(file_config[:filename_zip], tmp_file)
      end

      metadata_filepath = create_metadata_file(zip_file)
      if metadata_filepath.present?
        zip.add('metadata.csv', metadata_filepath)
      else
        puts "NO Metadata to save for #{zip_filename}"
      end
    end

    puts "Zip file #{zip_filename} created"
  end

  def create_metadata_file(zip_file)
    tmp_file = File.join(@temp_dir, zip_file.zip_filename.chomp('.zip') + '_metadata.csv')
    metadata_to_save = @metadata.select { |m| zip_file.metadata.include?(m[:dataset]) }

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
    zip_filepath = File.join(@temp_dir, zip_file.zip_filename)
    raise "File #{zip_file} not uploaded" unless s3_upload_file(zip_file.s3_key, zip_filepath)
  end

  def s3_head_file(filename)
    puts "Getting HEAD request from S3 #{s3_bucket}: #{filename}..."
    s3_client.head_object(bucket: s3_bucket, key: filename)
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
