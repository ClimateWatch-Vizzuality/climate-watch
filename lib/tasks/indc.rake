namespace :indc do
  desc 'Imports the INDC dataset from the csv sources'
  task import: :environment do
    TimedLogger.log('import indc data') do
      ImportIndc.new.call
    end
  end
end
