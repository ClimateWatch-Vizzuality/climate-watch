class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :basic_http_authentication

  def index
    @data = {}
    @isProduction = Rails.env.production?
    render 'index'
  end

  private

  def basic_http_authentication
    return unless ENV['PASSWORD_PROTECT']
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['AUTH_USERNAME'] && password == ENV['AUTH_PASSWORD']
    end
  end
end
