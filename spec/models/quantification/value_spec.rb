require 'rails_helper'

RSpec.describe Quantification::Value, type: :model do
  it 'should be invalid when variable not present' do
    expect(
      FactoryGirl.build(:quantification_value, label: nil)
    ).to have(1).errors_on(:label)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:quantification_value, location: nil)
    ).to have(1).errors_on(:location)
  end
end
