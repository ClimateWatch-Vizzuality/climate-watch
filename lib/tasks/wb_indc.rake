namespace :wb_indc do
  desc 'Imports the WB INDC dataset from the csv sources'
  task import: :environment do
    puts "####################################"
    puts "#  Starting to import WbIndc data  #"
    puts "####################################"
    ImportWbIndc.new.call
    puts "############## ENDED #################"
  end
end
