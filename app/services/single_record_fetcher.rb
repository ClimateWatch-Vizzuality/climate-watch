class SingleRecordFetcher
  attr_reader :url, :id

  def initialize(url, id)
    @id = id
    @url = url
  end

  def call
    response = Net::HTTP.get(URI("#{url}/#{id}"))
    JSON.parse(response)
  end
end
