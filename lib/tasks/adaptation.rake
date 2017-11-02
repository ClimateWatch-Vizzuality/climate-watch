namespace :adaptation do
  desc 'Imports Adaptation data from the csv sources'
  task import: :environment do
    puts "######################################"
    puts "# Starting to import adaptation data #"
    puts "######################################"
    ImportAdaptation.new.call
    puts "############## ENDED #################"
  end
end
