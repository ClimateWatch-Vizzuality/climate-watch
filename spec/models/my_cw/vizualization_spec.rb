require 'rails_helper'

RSpec.describe MyCw::Vizualization, type: :model do
  it 'should be invalid when no title is present' do
    expect(
      FactoryGirl.build(:vizualization, title: nil)
    ).to have(1).errors_on(:title)
  end

  it 'should be invalid when no user is present' do
    expect(
      FactoryGirl.build(:vizualization, user: nil)
    ).to have(1).errors_on(:user)
  end

  it 'should be valid when all is present' do
    expect(
      FactoryGirl.build(:vizualization)
    ).to be_valid
  end
end
