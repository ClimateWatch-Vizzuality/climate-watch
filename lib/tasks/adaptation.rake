namespace :adaptation do
  desc 'Imports Adaptation data from the csv sources'
  task import: :environment do
    TimedLogger.log('import adaptation data') do
      ImportAdaptation.new.call
    end
  end
end
