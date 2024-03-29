class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  if ENV['BASIC_AUTH'].present?
    http_basic_authenticate_with name: ENV['HTTP_AUTH_USERNAME'],
                                 password: ENV['HTTP_AUTH_PASSWORD']
  end

  def index
    @data = {}
    @actual_path = request.original_fullpath
    @is_contained = @actual_path.include?('contained') ||
      @actual_path.include?('embed')
    @use_precompiled_assets = Rails.env.production? || Rails.env.staging?
    response.headers['X-FRAME-OPTIONS'] = 'ALLOWALL'
    render 'index'
  end
end
