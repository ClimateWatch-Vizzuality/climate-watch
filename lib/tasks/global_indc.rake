namespace :global_indc do
  desc 'Imports the WB/CAIT global dataset from the csv sources'
  task import: :environment do
    ImportGlobalIndc.new.call
  end
end

