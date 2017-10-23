require 'rails_helper'

RSpec.describe Unfccc::Record, type: :model do
  it 'should be invalid when document not present' do
    expect(
      FactoryGirl.build(:unfccc_record, document: nil)
    ).to have(1).errors_on(:document)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:unfccc_record, location: nil)
    ).to have(1).errors_on(:location)
  end
end


