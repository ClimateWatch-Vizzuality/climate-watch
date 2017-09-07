require 'rails_helper'

RSpec.describe CaitIndc::Label, type: :model do
  it 'should be invalid when indicator not present' do
    expect(
      FactoryGirl.build(:cait_indc_label, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:cait_indc_label, name: nil)
    ).to have(1).errors_on(:name)
  end
end
