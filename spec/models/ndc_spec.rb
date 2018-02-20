require 'rails_helper'

RSpec.describe Ndc, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:ndc, location: nil)
    ).to have(1).errors_on(:location)
  end
end
