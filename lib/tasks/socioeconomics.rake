namespace :socioeconomics do
  desc 'Imports Socioeconomics data from the csv sources'
  task import: :environment do
    TimedLogger.log('import socioeconomics data') do
      ImportSocioeconomics.new.call
    end
  end
end
