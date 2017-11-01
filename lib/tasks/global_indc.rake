namespace :global_indc do
  desc 'Imports the WB/CAIT global dataset from the csv sources'
  task import: :environment do
    puts "######################################"
    puts "#  Starting to import GlobalIndc data#"
    puts "######################################"
    ImportGlobalIndc.new.call
    puts "############## ENDED #################"
  end
end
