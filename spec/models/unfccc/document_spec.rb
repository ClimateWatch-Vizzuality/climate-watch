require 'rails_helper'

RSpec.describe Unfccc::Document, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:unfccc_document, name: nil)
    ).to have(1).errors_on(:name)
  end
end

