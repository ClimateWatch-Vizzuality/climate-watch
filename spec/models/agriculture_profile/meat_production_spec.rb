# == Schema Information
#
# Table name: agriculture_profile_meat_productions
#
#  id                :bigint           not null, primary key
#  year              :integer          not null
#  production_agr_1  :integer
#  production_agr_2  :integer
#  production_agr_3  :integer
#  production_agr_4  :integer
#  production_agr_5  :integer
#  production_agr_6  :integer
#  production_agr_7  :integer
#  production_agr_8  :integer
#  production_agr_9  :integer
#  production_agr_10 :integer
#  location_id       :bigint
#
require 'rails_helper'

RSpec.describe AgricultureProfile::MeatProduction, type: :model do
  it 'should be invalid without location' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_production, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid without year' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_production, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be valid' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_production)
    ).to be_valid
  end
end
