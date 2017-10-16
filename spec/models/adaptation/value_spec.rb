require 'rails_helper'

RSpec.describe Adaptation::Value, type: :model do
  it 'should be invalid when variable not present' do
    expect(
      FactoryGirl.build(:adaptation_value, variable: nil)
    ).to have(1).errors_on(:variable)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:adaptation_value, location: nil)
    ).to have(1).errors_on(:location)
  end
end
