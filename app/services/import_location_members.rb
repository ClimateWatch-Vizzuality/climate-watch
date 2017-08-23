require 'csv'

class ImportLocationMembers
  def call
    bucket_name = Rails.application.secrets.s3_bucket_name
    file_name = 'data/locations_groupings.csv'
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: file_name)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{file_name} not found in #{bucket_name}"
      return
    end
    content = file.body.read
    import_records(content)
  end

  private

  def import_records(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      iso_code3 = iso_code3(row)
      parent_iso_code3 = parent_iso_code3(row)
      member = iso_code3 && Location.find_by_iso_code3(iso_code3)
      location = parent_iso_code3 &&
        Location.find_by_iso_code3(parent_iso_code3)
      if location && member
        LocationMember.find_or_create_by(
          location_id: location.id, member_id: member.id
        )
      else
        Rails.logger.warn "Unable to create member #{row}"
      end
    end
  end

  def iso_code3(row)
    row['iso_code3'] && row['iso_code3'].strip.upcase
  end

  def parent_iso_code3(row)
    row['parent_iso_code3'] && row['parent_iso_code3'].strip.upcase
  end
end
