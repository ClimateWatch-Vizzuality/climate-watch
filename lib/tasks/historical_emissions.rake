namespace :historical_emissions do
  desc 'Imports Historical Emissions data from the csv sources'
  task import: :environment do
    puts "################################################"
    puts "# Starting to import HistoricalEmissions data  #"
    puts "################################################"
    ImportHistoricalEmissions.new.call
    puts "################# ENDED ########################"
  end
end
