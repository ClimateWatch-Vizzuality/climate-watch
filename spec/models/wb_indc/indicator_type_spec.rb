require 'rails_helper'

describe WbIndc::IndicatorType, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:wb_indc_indicator_type, name: nil)
    ).to have(1).errors_on(:name)
  end
end
