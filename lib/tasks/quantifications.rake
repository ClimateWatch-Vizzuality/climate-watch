namespace :quantifications do
  desc 'Imports Quantification data from the csv sources'
  task import: :environment do
    ImportQuantifications.new.call
  end
end
