class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @data = { "name" => "Jane Doe" }
    render "index"
  end

end
