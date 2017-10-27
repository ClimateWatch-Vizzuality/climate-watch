require 'rails_helper'

describe Indc::Sector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:indc_sector, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when slug not present' do
    expect(
      FactoryGirl.build(:indc_sector, slug: nil)
    ).to have(1).errors_on(:slug)
  end
end
