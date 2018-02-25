require 'rails_helper'

RSpec.describe MyCw::Visualization, type: :model do
  it 'should be invalid when no title is present' do
    expect(
      FactoryBot.build(:visualization, title: nil)
    ).to have(1).errors_on(:title)
  end

  it 'should be invalid when no user is present' do
    expect(
      FactoryBot.build(:visualization, user: nil)
    ).to have(1).errors_on(:user)
  end

  it 'should be valid when all is present' do
    expect(
      FactoryBot.build(:visualization)
    ).to be_valid
  end
end
