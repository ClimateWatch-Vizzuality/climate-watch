namespace :wb_extra do
  desc 'Imports the WB Extra dataset from the csv sources'
  task import: :environment do
    puts "#####################################"
    puts "#  Starting to import WbExtra data  #"
    puts "#####################################"
    ImportWbExtra.new.call
    puts "############## ENDED #################"
  end
end
