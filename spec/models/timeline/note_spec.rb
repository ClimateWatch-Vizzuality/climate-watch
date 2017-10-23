require 'rails_helper'

RSpec.describe Timeline::Note, type: :model do
  it 'should be invalid when note not present' do
    expect(
      FactoryGirl.build(:timeline_note, note: nil)
    ).to have(1).errors_on(:note)
  end

  it 'should be invalid when document not present' do
    expect(
      FactoryGirl.build(:timeline_note, document: nil)
    ).to have(1).errors_on(:document)
  end
end


