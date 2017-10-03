namespace :wb_indc do
  desc 'Imports the WB INDC dataset from the csv sources'
  task import: :environment do
    ImportWbIndc.new.call
  end
end
