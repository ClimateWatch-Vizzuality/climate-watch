server '18.215.21.86', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'feature/infrastructure-migration'

set :default_env, {
}
