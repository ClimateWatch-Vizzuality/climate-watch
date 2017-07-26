class ImportNdcContent
  def call
    Ndc.delete_all
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    s3.list_objects(bucket: bucket_name, prefix: 'ndcs').each do |response|
      md_objects = response.contents.select { |o| o.key =~ /\.md$/ }
      md_objects.each { |object| import_object(s3, bucket_name, object) }
    end
  end

  private

  def import_object(s3, bucket_name, object)
    object.key =~ /ndcs\/(.+?)(-.+)?.md/
    code = Regexp.last_match[1]
    location = Location.find_by_code(code)
    unless location
      Rails.logger.warn "Location not found: #{code}"
      return
    end
    file = s3.get_object(bucket: bucket_name, key: object.key)
    content = file.body.read
    Ndc.create(location: location, content: content)
    # TODO: indexing for FTS
  end
end
