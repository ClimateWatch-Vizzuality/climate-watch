namespace :db do
  desc 'Creates platforms for admin panel'
  task platforms_create: :environment do
    platform_names = %w(global_cw_platform indonesia_platform india_platform)
    platform_names.each do |platform_name|
      Admin::Platform.create(name: platform_name)
    end
    puts 'Platforms for admin panel created'
  end
end
