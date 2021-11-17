# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "climatewatch"
set :repo_url, "https://github.com/ClimateWatch-Vizzuality/climate-watch.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/climatewatch"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, '.env'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 3

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

set :rvm_custom_path, '/usr/share/rvm'

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

set :init_system, :systemd

namespace :deploy do
  after :finishing, 'deploy:cleanup'
  after 'deploy:publishing', 'deploy:restart'
end


set :rvm_ruby_version, '2.5.9'

set :yarn_flags, '--production --silent --no-progress --frozen-lockfile --no-cache'

set :sidekiq_service_unit_user, :system

namespace :deploy do
  after 'yarn:install', 'deploy:import_maxmind'
  after 'deploy:migrate', 'deploy:admin_boilerplate:create'

  task :import_maxmind do
    on roles(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, 'db:import_maxmind'
        end
      end
    end
  end

  namespace :admin_boilerplate do
    task :create do
      on roles(:db) do
        within release_path do
          with rails_env: fetch(:rails_env) do
            execute :rake, 'db:admin_boilerplate:create'
          end
        end
      end
    end
  end
end
