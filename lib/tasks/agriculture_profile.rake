namespace :agriculture_profile do
  desc 'Import agriculture profile from remote .csv file'
  task import_profile: :environment do
    TimedLogger.log('import agriculture profile data') do
      ImportAgricultureProfile.new.call
    end
  end


  desc 'Import agriculture profile emissions from remote .csv file'
  task import_emissions: :environment do
    TimedLogger.log('import agriculture profile emissions') do
      ImportAgricultureEmissions.new.call
    end
  end

  desc 'Import all agriculture profile data from remote .csv file'
  task import: [
    'agriculture_profile:import_profile',
    'agriculture_profile:import_emissions'
  ]
end
