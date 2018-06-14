require 'csv'

module S3CSVReader
  def self.strip(hash)
    hash.map do |first, second|
      [first, second.strip]
    end.to_h
  end

  # @param header_converter [Symbol] default :symbol
  def self.read(filename, header_converter = nil)
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: filename)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{filename} not found in #{bucket_name}"
      return
    end

    strip_converter = ->(field, _) { field.strip }

    CSV.parse(
      file.body.read,
      headers: true,
      converters: [strip_converter],
      header_converters: header_converter || :symbol
    )
  end
end
