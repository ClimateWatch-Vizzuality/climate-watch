namespace :wb_extra do
  desc 'Imports the WB Extra dataset from the csv sources'
  task import: :environment do
    TimedLogger.log('import wb extra data') do
      ImportWbExtra.new.call
    end
  end
end
