class SingleRecordFetcher
  attr_reader :url, :id, :cache_key

  def initialize(url, cache_key, id=nil)
    @id = id
    @url = url
    @cache_key = cache_key
  end

  def call
    Rails.cache.fetch("#{cache_key}/laws_and_policies", expires: 7.days) do
      path = [url, id].compact.join('/')
      response = Net::HTTP.get(URI("#{path}"))
      JSON.parse(response)
    end
  end
end
