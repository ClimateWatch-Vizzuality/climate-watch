require 'rails_helper'

RSpec.describe AgricultureProfile::Area, type: :model do
  it 'should be invalid without location' do
    expect(
      FactoryBot.build(:agriculture_profile_area, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid without year' do
    expect(
      FactoryBot.build(:agriculture_profile_area, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be valid' do
    expect(
      FactoryBot.build(:agriculture_profile_area)
    ).to be_valid
  end
end
