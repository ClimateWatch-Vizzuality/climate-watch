source 'https://rubygems.org'
ruby '2.5.9'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# core gems
gem 'rails', '~> 5.2.4'
gem 'bootsnap'
gem 'puma'

# DB
gem 'pg', '~> 0.20'
gem 'pg_search'
gem 'scenic'

# UI, assets
gem 'coffee-rails', '~> 4.2'
gem 'sassc-rails', '~> 2.1.2'
gem 'sprockets',  '~> 3.7.2'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 5.4.2'

# API
gem 'active_model_serializers', '~> 0.10.0'
gem 'api-pagination'
gem 'faraday'
gem 'kaminari'

# Admin panel
gem 'activeadmin'
gem 'devise'
gem 'trix-rails', require: 'trix'

# storage
gem 'aws-sdk-rails', '~> 2'
gem 'aws-sdk-s3', '~> 1'

# jobs
gem 'sidekiq', '>= 6.1.0'

# Error monitoring
gem 'appsignal'

# other
# Moved to global gems because of this
# https://github.com/rails/rails/issues/24063
gem 'activerecord-import'
gem 'listen', '>= 3.0.5', '< 3.2'
gem 'maxmind-db'
gem 'oj'
gem 'rubyzip'

gem 'dotenv-rails'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'factory_bot_rails'
  gem 'rails-controller-testing'
  gem 'rspec-collection_matchers'
  gem 'rspec-rails', '~> 3.5'
  gem 'rspec-request_snapshot'
  gem 'selenium-webdriver'
end

group :development do
  gem 'annotate'
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'

  gem 'capistrano', '~> 3.10', require: false
  gem 'capistrano-rails', '~> 1.3', require: false
  gem 'capistrano-bundler'
  gem 'capistrano-yarn'
  gem 'capistrano-passenger', '~> 0.2.1'
  gem 'capistrano-rvm'
  gem 'capistrano-sidekiq'
end

group :test do
  gem 'json-schema', '2.8.0'
  gem 'simplecov', require: false
  gem 'test-prof'
  gem 'super_diff'
  gem 'vcr'
  gem 'webmock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

git 'https://github.com/ClimateWatch-Vizzuality/climate-watch-gems.git' do
  gem 'cw_data_uploader', '~> 0.5.1', require: 'data_uploader'
  gem 'climate_watch_engine', '~> 1.4.3'
end

# for debugging
# gem 'cw_data_uploader', '~> 0.5.1', require: 'data_uploader', path: '../climate-watch-gems'
