namespace :wri_metadata do
  desc 'Imports the WRI Metadata dataset from the csv sources'
  task import: :environment do
    puts "#########################################"
    puts "#  Starting to import WriMetadata data  #"
    puts "#########################################"
    ImportWriMetadata.new.call
    puts "############## ENDED #################"
  end
end
