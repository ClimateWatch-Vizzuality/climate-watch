class ImportLocations
  LOCATIONS_FILEPATH = "#{CW_FILES_PREFIX}locations/locations.csv".freeze
  CARTODB_URL =
    'https://wri-01.carto.com/api/v2/sql?q=SELECT%20name_engli,iso,topojson,centroid%20FROM%20gadm28_countries'.freeze

  def call
    import_locations(S3CSVReader.read(LOCATIONS_FILEPATH))
    mark_locations_with_eu_membership
    import_topojson
  end

  def self.countries_in_eu
    %w(AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU
       LUX MLT NLD POL PRT ROU SVK SVN ESP SWE)
  end

  private

  def import_locations(content)
    content.each do |row|
      attributes = {
        iso_code3: iso_code3(row),
        iso_code2: iso_code2(row),
        wri_standard_name: row[:wri_standard_name],
        pik_name: row[:pik_name],
        cait_name: row[:cait_name],
        ndcp_navigators_name: row[:ndcp_navigators_name],
        unfccc_group: row[:unfccc_group],
        location_type: row[:location_type] || 'COUNTRY',
        show_in_cw: show_in_cw(row)
      }

      create_or_update(attributes)
    end
  end

  def import_topojson
    uri = URI(CARTODB_URL)
    response = Net::HTTP.get(uri)
    parsed_response = JSON.parse(response, symbolize_names: true)
    parsed_response[:rows].each do |row|
      centroid = row[:centroid].nil? ? {} : JSON.parse(row[:centroid])
      begin
        Location.
          where(iso_code3: row[:iso]).
          update(topojson: JSON.parse(row[:topojson]), centroid: centroid)
      rescue JSON::ParserError => e
        STDERR.puts "Error importing data for #{row[:iso]}: #{e}"
      end
    end
  end

  def iso_code3(row)
    row[:iso_code3]&.upcase
  end

  def iso_code2(row)
    if row[:iso_code2].blank?
      ''
    else
      row[:iso_code2]&.upcase
    end
  end

  def show_in_cw(row)
    if row[:show_in_cw].blank?
      true
    else
      row[:show_in_cw].match?(/no/i) ? false : true
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

  def mark_locations_with_eu_membership
    self.class.countries_in_eu.each do |iso_code3|
      Location.find_by_iso_code3(iso_code3)&.update(is_in_eu: true)
    end
  end
end
