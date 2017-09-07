require 'rails_helper'

RSpec.describe CaitIndc::LocationDatum, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryGirl.build(:cait_indc_location_datum, location: nil)
    ).to have(1).errors_on(:location)
  end
end
