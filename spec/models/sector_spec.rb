require 'rails_helper'

RSpec.describe Sector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:sector, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when data_source not present' do
    expect(
      FactoryGirl.build(:sector, data_source: nil)
    ).to have(1).errors_on(:data_source)
  end
end
