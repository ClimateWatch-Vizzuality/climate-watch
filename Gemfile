source 'https://rubygems.org'
ruby '2.5.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '5.2.2'
gem 'bootsnap'

gem 'sprockets',  '~> 3.7.2'

# Use postgresql as the database for Active Record
gem 'pg', '~> 0.20'
gem 'pg_search'
gem 'rubyzip'
# Use Puma as the app server
gem 'puma', '~> 3.12.4'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Gem to make http requests
gem 'faraday'

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'


gem 'active_model_serializers', '~> 0.10.0'
gem 'api-pagination'
gem 'kaminari'
gem 'oj'
gem 'scenic'

# Add second shared database across country platforms
gem 'secondbase'
# Add activeadmin for simple CMS
gem 'activeadmin'
gem 'devise'

gem 'activerecord-import'

gem 'aws-sdk-rails', '~> 2'
gem 'aws-sdk-s3', '~> 1'

gem 'sidekiq'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Moved to global gems because of this
# https://github.com/rails/rails/issues/24063
gem 'listen', '>= 3.0.5', '< 3.2'
gem 'appsignal'

group :development, :test do
  gem 'dotenv-rails'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails', '~> 3.5'
  gem 'rspec-collection_matchers'
  gem 'rails-controller-testing'
  gem 'factory_bot_rails'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rubocop', require: false
end

group :test do
  gem 'simplecov', require: false
  gem 'json-schema'
  gem 'vcr'
  gem 'webmock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

git 'https://github.com/ClimateWatch-Vizzuality/climate-watch-gems.git' do
  gem 'cw_data_uploader', '~> 0.4.5', require: 'data_uploader'
  gem 'climate_watch_engine', '~> 1.4.3'
end

# for debugging
# gem 'cw_data_uploader', '~> 0.2.0', require: 'data_uploader', path: '../climate-watch-gems'
