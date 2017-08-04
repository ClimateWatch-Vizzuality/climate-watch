require 'csv'

namespace :locations do
  desc 'Import locations from local .csv file'
  task import: :environment do
    path = File.join(Rails.root, 'db', 'data', 'locations.csv')
    CSV.open(path, 'r', headers: true).each.with_index(2) do |row|
      code = row['code'] && row['code'].strip.upcase
      location = Location.find_by_code(code) || Location.new(code: code)

      attributes = {
        code: code,
        wri_standard_name: row['wri_standard_name'],
        group: row['group'] && row['group'] =~ /yes/i ? true : false,
        pik_name: row['pik_name'],
        cait_name: row['cait_name'],
        ndcp_navigators_name: row['ndcp_navigators_name'],
        unfccc_group: row['unfcc_group']
      }

      location.assign_attributes(attributes)

      location.save

      puts location.errors.inspect
    end
  end
end
