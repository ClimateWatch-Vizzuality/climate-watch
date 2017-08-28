require 'rails_helper'

RSpec.describe CaitIndc::LocationIndicatorValue, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:cait_indc_location_indicator_value, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when indicator not present' do
    expect(
      FactoryGirl.build(:cait_indc_location_indicator_value, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when indicator_value not present' do
    expect(
      FactoryGirl.build(:cait_indc_location_indicator_value, indicator_value: nil)
    ).to have(1).errors_on(:indicator_value)
  end
end
