namespace :db do
  desc 'Mark Location with is_in_eu flag'
  task mark_countries_with_in_eu_flag: :environment do
    ImportLocations.countries_in_eu.each do |iso_code3|
      Location.find_by_iso_code3(iso_code3)&.update(is_in_eu: true)
    end

    puts 'Locations marked!'
  end
end
