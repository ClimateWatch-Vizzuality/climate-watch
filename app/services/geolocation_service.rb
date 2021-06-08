class GeolocationService
  include Singleton

  class << self
    delegate :call, to: :instance
  end

  def call(ip)
    db.get(ip)&.dig('country', 'iso_code')
  end

  private

  def db
    @db ||= MaxMind::DB.new(db_path, mode: MaxMind::DB::MODE_MEMORY)
  end

  def db_path
    Rails.root.join('db', 'GeoLite2-Country.mmdb')
  end
end
