namespace :locations do
  desc 'Import locations from remote .csv file'
  task import: :environment do
    puts "######################################"
    puts "#  Starting to import Locations data #"
    puts "######################################"
    ImportLocations.new.call
    puts "############## ENDED #################"
  end
end

namespace :location_members do
  desc 'Import location members from remote .csv file'
  task import: :environment do
    ImportLocationMembers.new.call
  end
end
