require 'rails_helper'

RSpec.describe CaitIndc::Value, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:cait_indc_value, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when indicator not present' do
    expect(
      FactoryGirl.build(:cait_indc_value, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end
end
