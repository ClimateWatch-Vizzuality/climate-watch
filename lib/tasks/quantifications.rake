namespace :quantifications do
  desc 'Imports Quantification data from the csv sources'
  task import: :environment do
    puts "###########################################"
    puts "#  Starting to import Quantification data #"
    puts "###########################################"
    ImportQuantifications.new.call
    puts "############## ENDED #################"
  end
end
