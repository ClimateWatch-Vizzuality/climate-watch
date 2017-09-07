namespace :sdgs do
  desc 'Import sdgs from remote .csv file'
  task import: :environment do
    ImportSdgs.new.call
  end
end
