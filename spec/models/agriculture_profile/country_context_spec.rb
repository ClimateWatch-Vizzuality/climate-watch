require 'rails_helper'

RSpec.describe AgricultureProfile::CountryContext, type: :model do
  it 'should be invalid without location' do
    expect(
      FactoryBot.build(:agriculture_profile_country_context, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be valid' do
    expect(
      FactoryBot.build(:agriculture_profile_country_context)
    ).to be_valid
  end
end
