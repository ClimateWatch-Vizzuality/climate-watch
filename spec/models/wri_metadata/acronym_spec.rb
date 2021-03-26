# == Schema Information
#
# Table name: wri_metadata_acronyms
#
#  id         :bigint           not null, primary key
#  acronym    :text
#  definition :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

describe WriMetadata::Acronym, type: :model do
  it 'should be invalid when acronym not present' do
    expect(
      FactoryBot.build(:wri_metadata_acronym, acronym: nil)
    ).to have(1).errors_on(:acronym)
  end

  it 'should be invalid when definition not present' do
    expect(
      FactoryBot.build(:wri_metadata_acronym, definition: nil)
    ).to have(1).errors_on(:definition)
  end
end
