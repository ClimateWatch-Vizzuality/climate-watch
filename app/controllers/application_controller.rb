class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @data = {}
    @is_production = Rails.env.production?
    render 'index'
  end
end
