namespace :sdgs do
  desc 'Import sdgs from remote .csv file'
  task import: :environment do
    TimedLogger.log('import sdg data') do
      ImportSdgs.new.call
    end
  end
end
