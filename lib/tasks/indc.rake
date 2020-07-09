namespace :indc do
  desc 'Imports the INDC dataset from the csv sources'
  task import: :environment do
    TimedLogger.log('import indc data') do
      ImportIndc.new.call
    end
  end

  desc 'Generate Subsectors data for NDC Explorer'
  task subsectors_data: :environment do
    TimedLogger.log('generating subsectors data') do
      ImportIndc.new.generate_subsectors_map_data
    end
  end
end
