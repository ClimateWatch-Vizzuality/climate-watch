module ApplicationHelper
  def geolocation_meta_tag
    tag('meta', name: 'cw-user-country', content: GeolocationService.call(request.remote_ip))
  end
end
