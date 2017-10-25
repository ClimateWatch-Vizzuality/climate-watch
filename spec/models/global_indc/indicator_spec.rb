require 'rails_helper'

RSpec.describe GlobalIndc::Indicator, type: :model do
  it 'should be invalid when referencing both cait and wb indicators' do
    expect(
      FactoryGirl.build(:global_indc_indicator, :with_cait_reference, :with_wb_reference)
    ).to have(1).errors_on(:base)
  end
end
