namespace :ndc_content do
  desc 'Stores and indexes NDC content from S3'
  task import: :environment do
    ImportNdcContent.new.call
  end
end
