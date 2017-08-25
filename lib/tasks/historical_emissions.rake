namespace :historical_emissions do
  desc 'Imports Historical Emissions data from the csv sources'
  task import: :environment do
    ImportHistoricalEmissions.new.call
  end
end
