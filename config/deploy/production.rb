server '44.198.104.48', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'feature/infrastructure-migration'

set :default_env, {
}
