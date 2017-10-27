require 'rails_helper'

RSpec.describe Indc::Label, type: :model do
  it 'should be invalid when indicator not present' do
    expect(
      FactoryGirl.build(:indc_label, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:indc_label, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when index not present' do
    expect(
      FactoryGirl.build(:indc_label, index: nil)
    ).to have(1).errors_on(:index)
  end
end
