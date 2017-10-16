require 'rails_helper'

RSpec.describe CaitIndc::Indicator, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:cait_indc_indicator, name: nil)
    ).to have(1).errors_on(:name)
  end
end
