require 'rails_helper'

describe WbIndc::Sector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:wb_indc_sector, name: nil)
    ).to have(1).errors_on(:name)
  end
end
