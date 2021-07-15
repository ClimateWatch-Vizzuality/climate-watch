namespace :zip_files do
  task import: :environment do
    TimedLogger.log('Import ZIP files structure') do
      ImportZIPFiles.new.call(upload_files: false)
    end
  end

  task import_with_upload: :environment do
    TimedLogger.log('Import, generate and upload ZIP files') do
      ImportZIPFiles.new.call(upload_files: true)
    end
  end
end
