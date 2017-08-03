namespace :ndc_content do
  desc 'Stores and indexes NDC content from S3'
  task import: :environment do
    ImportNdcContent.new.call
  end

  desc 'Indexes NDC cotent'
  task index: :environment do
    Ndc.refresh_content_tsv
  end
end
