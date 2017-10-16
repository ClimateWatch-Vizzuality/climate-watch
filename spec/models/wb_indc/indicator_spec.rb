require 'rails_helper'

describe WbIndc::Indicator, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:wb_indc_indicator, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when indicator_type not present' do
    expect(
      FactoryGirl.build(:wb_indc_indicator, indicator_type: nil)
    ).to have(1).errors_on(:indicator_type)
  end

  it 'should be able to create indicator with all dependant records' do
    expect(
      FactoryGirl.build(:wb_indc_indicator_with_dependants)
    ).to be_valid
  end
end
