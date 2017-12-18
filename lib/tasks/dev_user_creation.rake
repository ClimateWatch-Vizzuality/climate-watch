namespace :db do
  desc 'Creates a default user with the token provided from the .env file'
  task user_creation: :environment do
    MyCw::User.create(ct_id: ENV['DEV_USER_ID'])
    puts 'User created'
  end
end
