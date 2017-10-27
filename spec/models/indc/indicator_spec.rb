require 'rails_helper'

describe Indc::Indicator, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:indc_indicator, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when slug not present' do
    expect(
      FactoryGirl.build(:indc_indicator, sljg: nil)
    ).to have(1).errors_on(:slug)
  end

  it 'should be invalid when source not present' do
    expect(
      FactoryGirl.build(:indc_indicator, source: nil)
    ).to have(1).errors_on(:source)
  end

  it 'should be able to create indicator with all dependant records' do
    expect(
      FactoryGirl.build(:indc_indicator, :with_dependants)
    ).to be_valid
  end
end
