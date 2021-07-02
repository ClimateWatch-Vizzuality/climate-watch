class GeolocationService
  include Singleton

  class << self
    delegate :call, to: :instance
  end

  def call(ip)
    return ENV['CW_USER_COUNTRY_OVERRIDE'] if Rails.env.development? && ENV['CW_USER_COUNTRY_OVERRIDE'].present?

    db.get(ip)&.dig('country', 'iso_code')
  end

  private

  def db
    @db ||= MaxMind::DB.new(db_path, mode: MaxMind::DB::MODE_MEMORY)
  end

  def db_path
    # Test and dev DB taken from https://github.com/maxmind/MaxMind-DB/tree/main/test-data
    return Rails.root.join('db', 'GeoLite2-Country-Test.mmdb') if !ENV['MAXMIND_REAL_DB'] && (Rails.env.test? || Rails.env.development?)

    Rails.root.join('db', 'GeoLite2-Country.mmdb')
  end
end
