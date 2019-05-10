namespace :agriculture_profile do
  desc 'Import agriculture metadata from remote .csv file'
  task import_metadata: :environment do
    TimedLogger.log('import agriculture metadata') do
      ImportAgricultureMetadata.new.call
    end
  end

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

  desc 'Import agriculture profile country contexts from remote .csv file'
  task import_contexts: :environment do
    TimedLogger.log('import agriculture country contexts') do
      ImportAgricultureContexts.new.call
    end
  end

  desc 'Import all agriculture profile data from remote .csv file'
  task import: [
    'agriculture_profile:import_metadata',
    'agriculture_profile:import_emissions',
    'agriculture_profile:import_contexts',
    'agriculture_profile:import_profile'
  ]
end
