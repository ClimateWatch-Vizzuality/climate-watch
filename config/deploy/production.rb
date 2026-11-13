host = ENV['CW_PRODUCTION_HOST'].to_s.strip
abort 'Set CW_PRODUCTION_HOST in .env' if host.empty?
server host, user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'master'

set :default_env, {
}
