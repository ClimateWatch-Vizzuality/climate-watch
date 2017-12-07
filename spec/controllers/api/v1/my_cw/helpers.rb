module Helpers
  def set_cookies
    request.cookies[:user_token] = ENV['DEV_USER_TOKEN']
  end
end
