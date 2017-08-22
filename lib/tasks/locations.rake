namespace :locations do
  desc 'Import locations from local .csv file'
  task import: :environment do
    ImportLocations.new.call
  end
end
