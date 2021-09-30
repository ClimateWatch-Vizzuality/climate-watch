server '18.215.21.86', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'fix/webpacker_deploy_issue'

set :default_env, {
  'RAILS_ENV' => 'staging',
  'RACK_ENV' => 'staging',
  'NODE_ENV' => 'production'
}