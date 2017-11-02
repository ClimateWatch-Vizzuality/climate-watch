namespace :socioeconomics do
  desc 'Imports Socioeconomics data from the csv sources'
  task import: :environment do
    puts "############################################"
    puts "#  Starting to import Socio Economic data  #"
    puts "###########################################"
    ImportSocioeconomics.new.call
  end
end
