require 'rails_helper'

RSpec.describe Gas, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:gas, name: nil)
    ).to have(1).errors_on(:name)
  end
end
