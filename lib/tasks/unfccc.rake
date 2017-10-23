namespace :unfccc do
  desc 'Imports UNFCCCC Documents data from the csv sources'
  task import: :environment do
    ImportUnfccc.new.call
  end
end
