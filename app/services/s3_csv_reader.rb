require 'csv'

module S3CSVReader
  def self.strip(hash)
    hash.map do |pair|
      if pair.second.respond_to?(:strip)
        [pair.first, pair.second.strip]
      else
        pair
      end
    end.to_h
  end

  def self.read(filename)
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: filename)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{filename} not found in #{bucket_name}"
      return
    end

    strip_converter = lambda { |field, _| field.strip }

    CSV.parse(
      file.body.read,
      headers: true,
      converters: [strip_converter],
      header_converters: :symbol
    )
  end
end
