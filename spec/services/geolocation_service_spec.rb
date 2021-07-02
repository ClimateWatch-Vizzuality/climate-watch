require 'rails_helper'

RSpec.describe GeolocationService do
  it 'returns country code if IP found' do
    # available test data here https://github.com/maxmind/MaxMind-DB/blob/main/source-data/GeoLite2-Country-Test.json
    expect(GeolocationService.call('81.2.69.142')).to eq('GB')
  end

  it 'returns nil if IP not found' do
    expect(GeolocationService.call('3.2.4.142')).to be_nil
  end
end
