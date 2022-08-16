server '18.215.21.86', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, ENV.fetch('DEPLOY_BRANCH') { 'develop' }

set :default_env, {
  'RAILS_ENV' => 'staging',
  'RACK_ENV' => 'staging',
  'NODE_ENV' => 'production'
}
