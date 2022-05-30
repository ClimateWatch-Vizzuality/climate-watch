# == Schema Information
#
# Table name: country_profile_values
#
#  id           :bigint           not null, primary key
#  location_id  :bigint           not null
#  indicator_id :bigint
#  category     :string
#  value        :string           not null
#  year         :integer
#
require 'rails_helper'

RSpec.describe CountryProfile::Value, type: :model do
  subject { build(:country_profile_value) }

  it { is_expected.to be_valid }

  it 'should be invalid when indicator not present' do
    subject.indicator = nil
    expect(subject).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when location not present' do
    subject.location = nil
    expect(subject).to have(1).errors_on(:location)
  end

  it 'should be invalid when value not present' do
    subject.value = nil
    expect(subject).to have(1).errors_on(:value)
  end
end
