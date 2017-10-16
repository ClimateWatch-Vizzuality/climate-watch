namespace :adaptation do
  desc 'Imports Adaptation data from the csv sources'
  task import: :environment do
    ImportAdaptation.new.call
  end
end
