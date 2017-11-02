require 'rails_helper'

RSpec.describe Socioeconomic::Indicator, type: :model do
  it 'should be invalid without year' do
    expect(
      FactoryGirl.build(:socioeconomic_indicator, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be invalid when year is taken' do
    location = FactoryGirl.create(:location)
    FactoryGirl.create(:socioeconomic_indicator, year: 2015, location: location)
    expect(
      FactoryGirl.build(:socioeconomic_indicator, year: 2015, location: location)
    ).to have(1).errors_on(:year)
  end
end
