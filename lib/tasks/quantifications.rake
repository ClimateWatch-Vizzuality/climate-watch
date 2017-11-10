namespace :quantifications do
  desc 'Imports Quantification data from the csv sources'
  task import: :environment do
    TimedLogger.log('import quantification data') do
      ImportQuantifications.new.call
    end
  end
end
