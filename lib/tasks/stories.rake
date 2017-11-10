namespace :stories do
  desc 'Import new stories from WRI RSS feed'
  task import: :environment do
    TimedLogger.log('import stories') do
      ImportStories.new.call
    end
  end

  desc 'Delete stories and re-import'
  task fresh_import: :environment do
    TimedLogger.log('fresh import stories') do
      ImportStories.new.call(true)
    end
  end
end
