host = ENV['CW_STAGING_HOST'].to_s.strip
abort 'Set CW_STAGING_HOST in .env' if host.empty?
server host, user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, ENV.fetch('DEPLOY_BRANCH') { 'develop' }

set :default_env, {
  'RAILS_ENV' => 'staging',
  'RACK_ENV' => 'staging',
  'NODE_ENV' => 'production'
}
