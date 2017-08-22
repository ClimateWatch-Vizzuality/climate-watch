require 'rails_helper'

RSpec.describe Location, type: :model do
  it 'should be invalid when code not present' do
    expect(
      FactoryGirl.build(:location, iso_code3: nil)
    ).to have(1).errors_on(:iso_code3)
  end
end
