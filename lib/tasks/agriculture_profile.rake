namespace :agriculture_profile do
  desc 'Import agriculture profile from remote .csv file'
  task import: :environment do
    TimedLogger.log('import agriculture profile data') do
      ImportAgricultureProfile.new.call
    end
  end
end
