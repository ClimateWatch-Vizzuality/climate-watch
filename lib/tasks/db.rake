namespace :db do
  desc 'Imports all data in correct order, replaces non-dictionary data'
  task import: [
    'locations:import',
    'location_members:import',
    'ndcs:full:import',
    'ndcs:full:index',
    'sdgs:import',
    'ndc_sdg_targets:import',
    'indc:import',
    'historical_emissions:import',
    'adaptation:import',
    'wri_metadata:import',
    'wb_extra:import',
    'timeline:import',
    'quantifications:import',
    'socioeconomics:import',
    'stories:import',
    'key_visualizations:import'
  ]

  desc 'Imports all data in correct order, replaces all data'
  task reimport: :environment do
    puts 'Deleting NdcSdg::Target'
    NdcSdg::Target.delete_all
    puts 'Deleting NdcSdg::Goal'
    NdcSdg::Goal.delete_all
    puts 'Deleting HistoricalEmissions::Record'
    HistoricalEmissions::Record.delete_all
    puts 'Deleting WbExtra::CountryData'
    WbExtra::CountryData.delete_all
    puts 'Deleting Socioeconomic::Indicator'
    Socioeconomic::Indicator.delete_all
    puts 'Deleting Locations'
    Location.all.each(&:destroy)
    puts 'Starting the import'
    puts 'Deleting stories'
    Story.delete_all
    Rake::Task['db:import'].invoke
  end
end
