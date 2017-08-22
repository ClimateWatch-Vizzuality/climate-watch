require 'csv'

class ImportLocations
  def call
    bucket_name = Rails.application.secrets.s3_bucket_name
    file_name = 'data/locations.csv'
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: file_name)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{file_name} not found in #{bucket_name}"
      return
    end
    content = file.body.read
    import_locations(content)
  end

  private

  def import_locations(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      attributes = {
        iso_code3: iso_code3(row),
        iso_code2: iso_code2(row),
        wri_standard_name: row['wri_standard_name'],
        pik_name: row['pik_name'],
        cait_name: row['cait_name'],
        ndcp_navigators_name: row['ndcp_navigators_name'],
        unfccc_group: row['unfccc_group'],
        location_type: row['location_type'] || 'COUNTRY',
        show_in_cw: show_in_cw(row)
      }

      create_or_update(attributes)
    end
  end

  def iso_code3(row)
    row['iso_code3'] && row['iso_code3'].strip.upcase
  end

  def iso_code2(row)
    if row['iso_code2'].blank?
      ''
    else
      row['iso_code2'] && row['iso_code2'].strip.upcase
    end
  end

  def show_in_cw(row)
    if row['show_in_cw'].blank?
      true
    else
      row['show_in_cw'].match?(/no/i) ? false : true
    end
  end

  def create_or_update(attributes)
    iso_code3 = attributes[:iso_code3]
    location = Location.find_by_iso_code3(iso_code3) ||
      Location.new(iso_code3: iso_code3)
    location.assign_attributes(attributes)

    op = location.new_record? ? 'CREATE' : 'UPDATE'

    if location.save
      Rails.logger.debug "#{op} OK #{iso_code3}"
    else
      Rails.logger.error "#{op} FAILED #{iso_code3}"
    end
  end
end
