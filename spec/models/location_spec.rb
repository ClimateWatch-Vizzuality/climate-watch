require 'rails_helper'

RSpec.describe Location, type: :model do
  it 'should be invalid when code not present' do
    expect(
      FactoryBot.build(:location, iso_code3: nil)
    ).to have(1).errors_on(:iso_code3)
  end
  let(:eu28) {
    FactoryBot.create(:location, iso_code3: 'EU28', location_type: 'GROUP')
  }
  let(:pol) {
    FactoryBot.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  }
  it 'has members' do
    eu28.members << pol
    expect(eu28.members).to eq([pol])
  end
end
