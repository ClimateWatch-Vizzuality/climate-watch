module Streamable
  extend ActiveSupport::Concern

  def create_headers(filename)
    headers.delete('Content-Length')
    headers['Cache-Control'] = 'no-cache'
    headers['Content-Type'] = 'application/zip'
    headers['Content-Disposition'] = "attachment; filename=\"#{filename}.zip\""
    headers['X-Accel-Buffering'] = 'no'
  end

  def stream_file(filename)
    create_headers filename
    self.response_body = yield
    response.status = 200
  ensure
    response.stream.close
  end
end
