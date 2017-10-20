namespace :db do
  desc 'Imports all data in correct order, replaces non-dictionary data'
  task import: [
    'locations:import',
    'location_members:import',
    'ndcs:full:import',
    'ndcs:full:index',
    'sdgs:import',
    'ndc_sdg_targets:import',
    'historical_emissions:import',
    'cait_indc:import',
    'wb_indc:import',
    'adaptation:import',
    'wri_metadata:import',
    'wb_extra:import'
  ]

  desc 'Imports all data in correct order, replaces all data'
  task reimport: :environment do
    Location.all.each(&:destroy)
    NdcSdg::Goal.all.each(&:destroy)
    Rake::Task['db:import'].invoke
  end
end
