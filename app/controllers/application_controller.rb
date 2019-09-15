class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  if Rails.env.staging?
    http_basic_authenticate_with name: ENV['HTTP_AUTH_USERNAME'],
                                 password: ENV['HTTP_AUTH_PASSWORD']
  end

  def index
    @data = {}
    @actual_path = request.original_fullpath
    @is_contained = @actual_path.include?('contained') ||
      @actual_path.include?('embed')
    @is_production = Rails.env.production?
    response.headers['X-FRAME-OPTIONS'] = 'ALLOWALL'
    render 'index'
  end
end
