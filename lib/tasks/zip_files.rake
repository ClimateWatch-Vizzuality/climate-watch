namespace :zip_files do
  task import: :environment do
    TimedLogger.log('Import Zip files structure') do
      ImportZipFiles.new.call(upload_files: false)
    end
  end

  task import_with_upload: :environment do
    TimedLogger.log('Import, generate and upload Zip files') do
      ImportZipFiles.new.call(upload_files: true)
    end
  end
end
