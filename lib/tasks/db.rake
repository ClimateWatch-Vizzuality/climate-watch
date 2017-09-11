namespace :db do
  desc 'Imports all data in correct order, replaces non-dictionary data'
  task import: [
    'locations:import',
    'location_members:import',
    'sdgs:import',
    'ndc_sdg_targets:import',
    'historical_emissions:import',
    'cait_indc:import',
    'ndcs:full:import',
    'ndcs:full:index'
  ]

  desc 'Imports all data in correct order, replaces all data'
  task reimport: :environment do
    Location.all.each(&:destroy)
    NdcSdg::Goal.all.each(&:destroy)
    Rake::Task['db:import'].invoke
  end
end
