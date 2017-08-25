require 'rails_helper'

RSpec.describe HistoricalEmission, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:historical_emission, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when data_source not present' do
    expect(
      FactoryGirl.build(:historical_emission, data_source: nil)
    ).to have(1).errors_on(:data_source)
  end

  it 'should be invalid when sector not present' do
    expect(
      FactoryGirl.build(:historical_emission, sector: nil)
    ).to have(1).errors_on(:sector)
  end

  it 'should be invalid when gas not present' do
    expect(
      FactoryGirl.build(:historical_emission, gas: nil)
    ).to have(1).errors_on(:gas)
  end
end
