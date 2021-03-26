# == Schema Information
#
# Table name: agriculture_profile_meat_consumptions
#
#  id                            :bigint           not null, primary key
#  year                          :integer          not null
#  meat_consumption_1            :float
#  meat_consumption_2            :float
#  meat_consumption_3            :float
#  meat_consumption_4            :float
#  meat_consumption_per_capita_1 :float
#  meat_consumption_per_capita_2 :float
#  meat_consumption_per_capita_3 :float
#  meat_consumption_per_capita_4 :float
#  location_id                   :bigint
#
require 'rails_helper'

RSpec.describe AgricultureProfile::MeatConsumption, type: :model do
  it 'should be invalid without location' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_consumption, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid without year' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_consumption, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be valid' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_consumption)
    ).to be_valid
  end
end
