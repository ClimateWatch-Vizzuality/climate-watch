require 'rails_helper'

describe WbIndc::Category, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:wb_indc_category, name: nil)
    ).to have(1).errors_on(:name)
  end
end
