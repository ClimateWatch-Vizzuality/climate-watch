# == Schema Information
#
# Table name: wri_metadata_values
#
#  id          :bigint           not null, primary key
#  source_id   :bigint
#  property_id :bigint
#  value       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

describe WriMetadata::Value, type: :model do
  it 'should be invalid when source not present' do
    expect(
      FactoryBot.build(:wri_metadata_value, source: nil)
    ).to have(1).errors_on(:source)
  end

  it 'should be invalid when property not present' do
    expect(
      FactoryBot.build(:wri_metadata_value, property: nil)
    ).to have(1).errors_on(:property)
  end
end
