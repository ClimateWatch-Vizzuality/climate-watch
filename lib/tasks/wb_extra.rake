namespace :wb_extra do
  desc 'Imports the WB Extra dataset from the csv sources'
  task import: :environment do
    ImportWbExtra.new.call
  end
end
