namespace :key_visualizations do
  desc 'Import key visualizations'
  task import: :environment do
    TimedLogger.log('import key visualizations') do
      ImportKeyVisualizations.new.call
    end
  end
end
