namespace :ndcs do
  namespace :full do
    desc 'Stores and indexes NDC full text from S3'
    task import: :environment do
      ImportNdcFullTexts.new.call
    end
  end
end
