class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @data = {}
    render 'index'
  end
end
