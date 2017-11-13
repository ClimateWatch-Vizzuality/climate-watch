namespace :wri_metadata do
  desc 'Imports the WRI Metadata dataset from the csv sources'
  task import: :environment do
    TimedLogger.log('import wri metadata data') do
      ImportWriMetadata.new.call
    end
  end
end
