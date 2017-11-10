namespace :locations do
  desc 'Import locations from remote .csv file'
  task import: :environment do
    TimedLogger.log('import location data') do
      ImportLocations.new.call
    end
  end
end

namespace :location_members do
  desc 'Import location members from remote .csv file'
  task import: :environment do
    TimedLogger.log('import location member data') do
      ImportLocationMembers.new.call
    end
  end
end
