namespace :wri_metadata do
  desc 'Imports the WRI Metadata dataset from the csv sources'
  task import: :environment do
    ImportWriMetadata.new.call
  end
end
