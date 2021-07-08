require 'fileutils'
require 'zip'

class GenerateZIPFiles
  STRUCTURE_CSV = Rails.root.join('db', 'zip.csv')
  TEMP_DIR = Rails.root.join('tmp', 'zip_files')
  IGNORE = ['ALL DATA', 'NDC TEXT IN HTML', 'PATHWAYS'].freeze
  TAKE = ['NDC CONTENT'].freeze

  def call
    load_structure
    generate_and_upload_files
  end

  private

  def load_structure
    strip_converter = ->(field) { field&.strip }

    parsed_data = CSV.parse(
      File.read(STRUCTURE_CSV),
      headers: true,
      skip_blanks: true,
      converters: [strip_converter],
      header_converters: :symbol
    )
    @structure = parsed_data.map(&:to_h)
    @zip_files = @structure.
      reject { |s| IGNORE.include? s[:drop_down] }.
      map { |s| s[:zip_file] }.
      uniq
    # .select { |s| TAKE.include? s[:drop_down] }
  end

  def generate_and_upload_files
    @temp_dir = "#{TEMP_DIR}/#{Time.now.strftime('%Y%m%d%H%M%S')}"
    puts "Creating #{@temp_dir}"
    FileUtils.mkdir_p(@temp_dir)
    @zip_files.each do |zip_file|
      generate_and_upload_file(zip_file)
    end
  ensure
    puts "Removing #{@temp_dir}"
    # FileUtils.rm_rf(@temp_dir)
  end

  def generate_and_upload_file(zip_file)
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

  def s3_download_file(filename)
    puts "Downloading from S3: #{filename}..."
    bucket = Rails.application.secrets.s3_bucket_name
    s3_client.get_object(bucket: bucket, key: filename).body.read
  rescue Aws::S3::Errors::NoSuchKey
    puts "File #{filename} not found in #{bucket}"
  end

  def s3_client
    Aws::S3::Client.new
  end
end
