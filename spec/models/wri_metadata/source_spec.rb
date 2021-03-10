# == Schema Information
#
# Table name: wri_metadata_sources
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

describe WriMetadata::Source, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:wri_metadata_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
