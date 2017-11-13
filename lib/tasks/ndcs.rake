namespace :ndcs do
  namespace :full do
    desc 'Stores and indexes NDC full text from S3'
    task import: :environment do
      TimedLogger.log('import ndc text data') do
        ImportNdcTexts.new.call
      end
    end

    desc 'Indexes NDC full text'
    task index: :environment do
      TimedLogger.log('ndc full text indexation') do
        Ndc.refresh_full_text_tsv
      end
    end
  end
end
