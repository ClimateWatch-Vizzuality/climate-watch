namespace :cait_indc do
  desc 'Imports the CAIT INDC dataset from the csv sources'
  task import: :environment do
    ImportCaitIndc.new.call
  end
end
