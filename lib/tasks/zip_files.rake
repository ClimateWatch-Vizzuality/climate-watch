namespace :zip_files do
  task import: :environment do
    TimedLogger.log('Import ZIP files structure') do
      ImportZIPFiles.new.call(upload_files: false)
    end
  end
end
