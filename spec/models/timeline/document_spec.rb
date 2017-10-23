require 'rails_helper'

RSpec.describe Timeline::Document, type: :model do
  it 'should be invalid when source not present' do
    expect(
      FactoryGirl.build(:timeline_document, source: nil)
    ).to have(1).errors_on(:source)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:timeline_document, location: nil)
    ).to have(1).errors_on(:location)
  end
end


