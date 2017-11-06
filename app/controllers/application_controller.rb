class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @data = {}
    @isProduction = Rails.env.production?
    render 'index'
  end
end
