require 'rails_helper'

RSpec.describe Location, type: :model do
  it 'should be invalid when code not present' do
    expect(
      FactoryGirl.build(:location, code: nil)
    ).to have(1).errors_on(:code)
  end
end
