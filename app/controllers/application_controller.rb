class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @data = {}
    @actual_path = request.original_fullpath
    @is_production = Rails.env.production?
    render 'index'
  end
end
