namespace :db do
  desc 'Creates boilerplate for admin panel'
  task admin_boilerplate_create: :environment do
    Rake::Task['db:platforms_create'].invoke
    Rake::Task['db:sections_create'].invoke
    Rake::Task['db:datasets_create'].invoke
    puts 'All done!'
  end
end
