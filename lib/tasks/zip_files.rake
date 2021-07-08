namespace :zip_files do
  task generate: :environment do
    TimedLogger.log('Generating ZIP files') do
      GenerateZIPFiles.new.call
    end
  end
end
