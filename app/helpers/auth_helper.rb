module AuthHelper
  include ActionController::Cookies
  NETWORKS = %w(facebook google twitter).freeze
  @current_user = nil

  def redirect_to_api_gateway_login(api_url, network = nil)
    if NETWORKS.include?(network)
      redirect_to "#{ENV['API_URL']}/#{network}/auth?callbackUrl=#{api_url}&token=true"
    else
      redirect_to "#{ENV['API_URL']}/auth?callbackUrl=#{api_url}&token=true"
    end
  end

  def redirect_to_api_gateway_logout(api_url)
    redirect_to "#{ENV['API_URL']}/auth/logout?callbackUrl=#{api_url}"
  end

  def ensure_logged_in
    return false unless cookies['user_token']
    connect = Faraday.new(url: (ENV['API_URL']).to_s) do |faraday|
      faraday.request :url_encoded # form-encode POST params
      faraday.response :logger # log requests to STDOUT
      faraday.adapter Faraday.default_adapter # make requests with Net::HTTP
    end
    connect.authorization :Bearer, cookies['user_token']
    response = connect.get('/auth/check-logged')
    if !response.success?
      @current_user = nil
      false
    else
      user_data = JSON.parse response.body
      @current_user = user_data.symbolize_keys!
      @current_user[:user_id] = ::MyCw::User.find_by ct_id: @current_user[:id]
      true
    end
  end
end
