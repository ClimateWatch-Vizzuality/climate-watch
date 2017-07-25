class ImportNdcContent
  def call
    s3 = Aws::S3::Resource.new
    bucket = s3.bucket(ENV['S3_BUCKET_NAME'])
    Ndc.delete_all
    md_files = bucket.objects(prefix: 'ndcs').select { |o| o.key =~ /\.md$/ }
    md_files.each { |object| import_object(object) }
  end

  private

  def import_object(object)
    object.key =~ /ndcs\/(.+?)(-.+)?.md/
    code = Regexp.last_match[1]
    location = Location.find_by_code(code)
    unless location
      Rails.logger.warn "Location not found: #{code}"
      return
    end
    content = object.get.body.read
    Ndc.create(location: location, content: content)
    # TODO: indexing for FTS
  end
end
