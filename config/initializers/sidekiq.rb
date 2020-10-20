redis_namespace =
  if ENV['CW_FILES_PREFIX'].present?
    ENV['CW_FILES_PREFIX'].gsub('/', ':').chomp(':')
  else
    "climate_watch"
  end
redis_namespace += "_#{Rails.env}"

Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_SERVER'], namespace: redis_namespace }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_SERVER'], namespace: redis_namespace }
end
