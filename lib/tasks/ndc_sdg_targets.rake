namespace :ndc_sdg_targets do
  desc 'Import NDC - SDG target linkages'
  task import: :environment do
    puts "########################################"
    puts "# Starting to import NdcSdgTarget data #"
    puts "########################################"
    ImportNdcSdgTargets.new.call
    puts "############## ENDED #################"
  end
end
