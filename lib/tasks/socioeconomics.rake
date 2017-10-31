namespace :socioeconomics do
  desc 'Imports Socioeconomics data from the csv sources'
  task import: :environment do
    ImportSocioeconomics.new.call
  end
end
