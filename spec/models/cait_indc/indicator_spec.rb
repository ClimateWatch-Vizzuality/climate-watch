require 'rails_helper'

RSpec.describe CaitIndc::Indicator, type: :model do
  it 'should be invalid when chart not present' do
    expect(
      FactoryGirl.build(:cait_indc_indicator, chart: nil)
    ).to have(1).errors_on(:chart)
  end

  it 'should be invalid when indicator_type not present' do
    expect(
      FactoryGirl.build(:cait_indc_indicator, indicator_type: nil)
    ).to have(1).errors_on(:indicator_type)
  end
  it 'should be invalid when category not present' do
    expect(
      FactoryGirl.build(:cait_indc_indicator, category: nil)
    ).to have(1).errors_on(:category)
  end

  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:cait_indc_indicator, name: nil)
    ).to have(1).errors_on(:name)
  end
end
