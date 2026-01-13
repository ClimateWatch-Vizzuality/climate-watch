class SingleRecordFetcher
  class FetchError < StandardError; end

  MAX_REDIRECTS = 3

  attr_reader :url, :id, :cache_key

  def initialize(url, cache_key, id = nil)
    @id = id
    @url = url
    @cache_key = cache_key
  end

  def call
    Rails.cache.fetch("#{cache_key}/laws_and_policies", expires: 7.days) do
      fetch_data
    end
  rescue FetchError
    {}
  end

  private

  def fetch_data(redirect_count = 0)
    path = [url, id].compact.join('/')
    fetch_url(path, redirect_count)
  end

  def fetch_url(path, redirect_count)
    uri = URI(path)
    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https',
                                open_timeout: 10, read_timeout: 10) do |http|
      request = Net::HTTP::Get.new(uri)
      http.request(request)
    end

    if response.is_a?(Net::HTTPRedirection)
      if redirect_count >= MAX_REDIRECTS
        Rails.logger.warn("[SingleRecordFetcher] Too many redirects for #{path}")
        raise FetchError
      end

      location = response['location']
      new_url = location.start_with?('http') ? location : URI.join("#{uri.scheme}://#{uri.host}", location).to_s
      Rails.logger.info("[SingleRecordFetcher] Following redirect from #{path} to #{new_url}")
      return fetch_url(new_url, redirect_count + 1)
    end

    unless response.is_a?(Net::HTTPSuccess)
      Rails.logger.warn("[SingleRecordFetcher] API error for #{path}: #{response.code} - #{response.message}")
      raise FetchError
    end

    JSON.parse(response.body)
  rescue JSON::ParserError => e
    Rails.logger.warn("[SingleRecordFetcher] JSON parse error for #{path}: #{e.message}")
    raise FetchError
  rescue Net::OpenTimeout, Net::ReadTimeout => e
    Rails.logger.warn("[SingleRecordFetcher] Timeout for #{path}: #{e.message}")
    raise FetchError
  rescue FetchError
    raise
  rescue StandardError => e
    Rails.logger.warn("[SingleRecordFetcher] Unexpected error for #{path}: #{e.class} - #{e.message}")
    raise FetchError
  end
end
