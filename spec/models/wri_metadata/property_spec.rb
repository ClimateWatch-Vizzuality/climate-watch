require 'rails_helper'

describe WriMetadata::Property, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:wri_metadata_property, name: nil)
    ).to have(1).errors_on(:name)
  end
end
