class SingleRecordFetcher
  attr_reader :url, :id

  def initialize(url, id)
    @id = id
    @url = url
  end

  def call
    Rails.cache.fetch("api/v1/lse_laws_and_policies/#{id}", expires: 7.days) do
      response = Net::HTTP.get(URI("#{url}/#{id}"))
      JSON.parse(response)
    end
  end
end
