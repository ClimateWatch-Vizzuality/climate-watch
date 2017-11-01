namespace :timeline do
  desc 'Imports timeline documents data from the csv sources'
  task import: :environment do
    puts "######################################"
    puts "#  Starting to import Timeline data  #"
    puts "######################################"
    ImportTimeline.new.call
    puts "############## ENDED #################"
  end
end
