namespace :ndcs do
  namespace :full do
    desc 'Stores and indexes NDC full text from S3'
    task import: :environment do
      ImportNdcTexts.new.call
    end

    desc 'Indexes NDC full text'
    task index: :environment do
      Ndc.refresh_full_text_tsv
    end
  end
end
