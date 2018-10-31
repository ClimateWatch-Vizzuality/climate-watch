# require 'httparty'

class SingleRecordFetcher
  attr_reader :url, :params

  def initialize(url, params)
    @params = params
    @url = url
  end

  def call
    response = Net::HTTP.get(URI("#{url}/#{params[:id]}"))
    JSON.parse(respone)
    # response.parsed_response
  end
end
