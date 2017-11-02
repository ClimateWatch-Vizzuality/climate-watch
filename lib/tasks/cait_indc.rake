namespace :cait_indc do
  desc 'Imports the CAIT INDC dataset from the csv sources'
  task import: :environment do
    puts "######################################"
    puts "#  Starting to import CaitIndc data  #"
    puts "######################################"
    ImportCaitIndc.new.call
    puts "############## ENDED #################"
  end
end
