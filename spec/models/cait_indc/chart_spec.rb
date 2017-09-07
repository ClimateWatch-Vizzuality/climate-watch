require 'rails_helper'

RSpec.describe CaitIndc::Chart, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:cait_indc_chart, name: nil)
    ).to have(1).errors_on(:name)
  end
end
