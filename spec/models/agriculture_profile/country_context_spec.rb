# == Schema Information
#
# Table name: agriculture_profile_country_contexts
#
#  id                     :bigint           not null, primary key
#  year                   :integer          not null
#  employment_agri_female :float
#  employment_agri_male   :float
#  employment_agri_total  :float
#  total_pesticides_use   :float
#  total_fertilizers      :float
#  water_withdrawal       :float
#  water_withdrawal_rank  :integer
#  value_added_agr        :float
#  location_id            :bigint
#
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
