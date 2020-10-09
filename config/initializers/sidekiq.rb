Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_SERVER'], namespace: "climate_watch_#{Rails.env}" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_SERVER'], namespace: "climate_watch_#{Rails.env}" }
end
