namespace :country_profile do
  desc 'Import country profile'
  task import: :environment do
    TimedLogger.log('import country profile') do
      ImportCountryProfile.new.call
    end
  end
end
