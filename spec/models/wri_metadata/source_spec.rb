require 'rails_helper'

describe WriMetadata::Source, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:wri_metadata_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
