namespace :zip_files do
  task import: :environment do
    TimedLogger.log('Generating ZIP files') do
      ImportZIPFiles.new.call
    end
  end
end
