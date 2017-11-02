namespace :sdgs do
  desc 'Import sdgs from remote .csv file'
  task import: :environment do
    puts "##################################"
    puts "#  Starting to import Sdgs data  #"
    puts "##################################"
    ImportSdgs.new.call
    puts "############## ENDED #############"
  end
end
