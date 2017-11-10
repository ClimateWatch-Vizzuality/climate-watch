namespace :timeline do
  desc 'Imports timeline documents data from the csv sources'
  task import: :environment do
    TimedLogger.log('import timeline data') do
      ImportTimeline.new.call
    end
  end
end
