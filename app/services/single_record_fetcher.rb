class SingleRecordFetcher
  attr_reader :url, :id, :cache_key

  def initialize(url, cache_key, id = nil)
    @id = id
    @url = url
    @cache_key = cache_key
  end

  def call
    Rails.cache.fetch("#{cache_key}/laws_and_policies", expires: 7.days) do
      path = [url, id].compact.join('/')
      
      begin
        uri = URI(path)
        response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https', 
                                    open_timeout: 10, read_timeout: 10) do |http|
          request = Net::HTTP::Get.new(uri)
          http.request(request)
        end

        unless response.is_a?(Net::HTTPSuccess)
          Rails.logger.error("SingleRecordFetcher API error for #{path}: #{response.code} - #{response.message}")
          return {}
        end

        JSON.parse(response.body)
      rescue JSON::ParserError => e
        Rails.logger.error("SingleRecordFetcher JSON parse error for #{path}: #{e.message}")
        {}
      rescue Net::OpenTimeout, Net::ReadTimeout => e
        Rails.logger.error("SingleRecordFetcher timeout for #{path}: #{e.message}")
        {}
      rescue StandardError => e
        Rails.logger.error("SingleRecordFetcher unexpected error for #{path}: #{e.class} - #{e.message}")
        {}
      end
    end
  end
end
