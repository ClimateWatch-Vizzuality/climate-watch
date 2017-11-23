require 'rails_helper'

describe 'VCR-RSpec integration' do
  def make_http_request
    connect = Faraday.new(url: (ENV['GFW_API']).to_s) do |faraday|
      faraday.request :url_encoded # form-encode POST params
      faraday.response :logger # log requests to STDOUT
      faraday.adapter Faraday.default_adapter # make requests with Net::HTTP
    end
    connect.authorization :Bearer, ENV['DEV_USER_TOKEN']
    connect.get('/auth/check-logged')
  end

  skip 'without an explicit cassette name' do
    it 'records an http request' do
      VCR.use_cassette('user_token') do
        expect(make_http_request).to be_success
      end
    end
  end

end