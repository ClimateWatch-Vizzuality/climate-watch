require 'rails_helper'

RSpec.describe AgricultureProfile::Emission, type: :model do
  it 'should be invalid without location' do
    expect(
        FactoryBot.build(:agriculture_profile_emission)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid without subcategory' do
    expect(
        FactoryBot.build(:agriculture_profile_emission)
    ).to have(1).errors_on(:emission_subcategory)
  end

  it 'should be invalid without values' do
    expect(
        FactoryBot.build(:agriculture_profile_emission, values: nil)
    ).to have(1).errors_on(:values)
  end

  it 'should be valid when all is complete' do
    expect(
        FactoryBot.build(:agriculture_profile_emission_complete)
    ).to be_valid
  end

  it 'should be invalid when the subcategory and location are the same' do
    location = FactoryBot.create(:location)
    subcategory = FactoryBot.create(:agriculture_profile_emission_subcategory)
    FactoryBot.create(
        :agriculture_profile_emission,
        location: location,
        emission_subcategory: subcategory
    )
    expect(
        FactoryBot.build(
            :agriculture_profile_emission,
            location: location,
            emission_subcategory: subcategory
        )
    ).to have(1).errors_on(:emission_subcategory_id)
  end
end
