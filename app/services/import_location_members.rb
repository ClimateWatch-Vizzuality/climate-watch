class ImportLocationMembers
  LOCATION_GROUPINGS_FILEPATH = "#{CW_FILES_PREFIX}locations_members/locations_groupings.csv"

  def call
    import_records(S3CSVReader.read(LOCATION_GROUPINGS_FILEPATH))
  end

  private

  def import_records(content)
    content.each.with_index(2) do |row|
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
    row[:iso_code3] && row[:iso_code3].upcase
  end

  def parent_iso_code3(row)
    row[:parent_iso_code3] && row[:parent_iso_code3].upcase
  end
end
