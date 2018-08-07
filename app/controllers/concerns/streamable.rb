module Streamable
  extend ActiveSupport::Concern

  def create_headers(filename)
    headers.delete('Content-Length')
    headers['Cache-Control'] = 'no-cache'
    headers['Content-Type'] = 'text/csv'
    headers['Content-Disposition'] = "attachment; filename=\"#{filename}.csv\""
    headers['X-Accel-Buffering'] = 'no'
  end

  def stream_file(filename)
    create_headers filename
    self.response_body =
      Enumerator.new do |y|
        yield y
      end
    response.status = 200
  ensure
    response.stream.close
  end
end
