namespace :locations do
  desc 'Import locations from remote .csv file'
  task import: :environment do
    ImportLocations.new.call
  end
end

namespace :location_members do
  desc 'Import location members from remote .csv file'
  task import: :environment do
    ImportLocationMembers.new.call
  end
end
