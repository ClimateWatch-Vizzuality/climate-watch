require 'csv'

namespace :locations do
  desc 'Import locations from local .csv file'
  task import: :environment do
    path = File.join(Rails.root, 'db', 'data', 'locations.csv')
    CSV.open(path, 'r', headers: true).each.with_index(2) do |row|
      iso_code3 = row['iso_code3'] && row['iso_code3'].strip.upcase

      location = Location.find_by_iso_code3(iso_code3) ||
        Location.new(iso_code3: iso_code3)

      iso_code2 =
        if row['iso_code2'].blank?
          ''
        else
          row['iso_code2'] && row['iso_code2'].strip.upcase
        end
      show_in_cw =
        if row['show_in_cw'].blank?
          true
        else
          row['show_in_cw'].match?(/no/i) ? false : true
        end

      attributes = {
        iso_code3: iso_code3,
        iso_code2: iso_code2,
        wri_standard_name: row['wri_standard_name'],
        pik_name: row['pik_name'],
        cait_name: row['cait_name'],
        ndcp_navigators_name: row['ndcp_navigators_name'],
        unfccc_group: row['unfccc_group'],
        location_type: row['location_type'] || 'COUNTRY',
        show_in_cw: show_in_cw
      }

      location.assign_attributes(attributes)

      op = location.new_record? ? 'CREATE' : 'UPDATE'

      if location.save
        Rails.logger.debug "#{op} OK #{iso_code3}"
      else
        Rails.logger.error "#{op} FAILED #{iso_code3}"
        Rails.logger.error location.errors.inspect
      end
    end
  end
end
