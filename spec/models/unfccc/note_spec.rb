require 'rails_helper'

RSpec.describe Unfccc::Note, type: :model do
  it 'should be invalid when note not present' do
    expect(
      FactoryGirl.build(:unfccc_note, note: nil)
    ).to have(1).errors_on(:note)
  end

  it 'should be invalid when record not present' do
    expect(
      FactoryGirl.build(:unfccc_note, record: nil)
    ).to have(1).errors_on(:record)
  end
end


