namespace :historical_emissions do
  desc 'Imports Historical Emissions data from the csv sources'
  task import: :environment do
    TimedLogger.log('import historical emissions data') do
      ImportHistoricalEmissions.new.call
    end
  end
end
