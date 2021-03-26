# == Schema Information
#
# Table name: indc_values
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  location_id  :bigint           not null
#  sector_id    :bigint
#  label_id     :bigint
#  value        :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  document_id  :bigint
#
require 'rails_helper'

describe Indc::Value, type: :model do
  it 'should be invalid when indicator not present' do
    expect(
      FactoryBot.build(:indc_value, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:indc_value, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when value not present' do
    expect(
      FactoryBot.build(:indc_value, value: nil)
    ).to have(1).errors_on(:value)
  end

  it 'should not be invalid when sector not present' do
    expect(
      FactoryBot.build(:indc_value, sector: nil)
    ).to have(0).errors_on(:sector)
  end
end
