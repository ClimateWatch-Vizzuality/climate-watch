# == Schema Information
#
# Table name: wri_metadata_properties
#
#  id         :bigint           not null, primary key
#  slug       :text
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

describe WriMetadata::Property, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:wri_metadata_property, name: nil)
    ).to have(1).errors_on(:name)
  end
end
